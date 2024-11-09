import requests
import os
import subprocess
import random
import re
import threading
import urllib.request
import argparse
import sys
from colorama import Fore, Back, Style, init
from time import time

init(autoreset=True)

output_file = 'proxy.txt'
os.system('cls' if os.name == 'nt' else 'clear')

if os.path.isfile(output_file):
    os.remove(output_file)
    print(f"{Fore.RED}'proxy.txt' telah dihapus.{Fore.RESET}")

print(f"{Fore.YELLOW}Otw Download\n")

proxy_urls = [
'https://api.proxyscrape.com/v2/?request=displayproxies',
'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/http/http.txt',
'https://raw.githubusercontent.com/roosterkid/openproxylist/main/HTTPS_RAW.txt',
'https://raw.githubusercontent.com/yuceltoluyag/GoodProxy/main/raw.txt',
'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/http.txt',
'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/https.txt',
'https://raw.githubusercontent.com/mmpx12/proxy-list/master/https.txt',
'https://proxyspace.pro/http.txt',
'https://api.proxyscrape.com/?request=displayproxies&proxytype=http',
'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt',
'http://worm.rip/http.txt',
'http://worm.rip/https.txt',
'http://alexa.lr2b.com/proxylist.txt',
'https://api.openproxylist.xyz/http.txt',
'http://rootjazz.com/proxies/proxies.txt',
'https://multiproxy.org/txt_all/proxy.txt',
'https://proxy-spider.com/api/proxies.example.txt',
'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt',
'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies.txt',
'https://raw.githubusercontent.com/hookzof/socks5_list/master/proxy.txt',
'https://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list-raw.txt',
'https://raw.githubusercontent.com/sunny9577/proxy-scraper/master/proxies.txt',
'https://raw.githubusercontent.com/opsxcq/proxy-list/master/list.txt',
'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all',
'https://www.proxydocker.com/en/proxylist/download?email=noshare&country=all&city=all&port=all&type=all&anonymity=all&state=all&need=all',
'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=anonymous',

'https://www.proxyscrape.com/free-proxy-list',
'https://www.proxy-list.download/api/v1/get?type=http',
'https://www.sslproxies.org/',
'https://www.us-proxy.org/',
'https://www.freeproxylists.net/',
'https://www.proxyvigilante.com/free-proxy-list/',
'https://www.nntime.com/proxy-list/',
'https://www.proxylistdaily.com/',
'https://www.proxydocker.com/en/proxylist/download',
'https://www.proxy-list.download/api/v1/get?type=socks4',
'https://www.proxy-list.download/api/v1/get?type=socks5',
'https://www.proxyvigilante.com/proxy-list/',
'https://www.proxy-list.download/api/v1/get?type=https',
'https://www.freetheproxy.com/proxies/',
'https://www.proxy-seek.com/free-proxy-list',
'https://api.proxyscrape.com/?request=getproxies&protocol=https',
'https://www.proxylistproject.com/free-proxy-list/',
'https://raw.githubusercontent.com/proxy-list/proxy-list/master/proxy-list.txt',
'https://proxydb.net/api/proxy-list?limit=100',
'https://www.proxyscrape.com/free-proxy-list',
'https://www.proxy-list.download/api/v1/get?type=http',
'https://www.sslproxies.org/',
'https://www.us-proxy.org/',
'https://www.freeproxylists.net/',
'https://www.proxyvigilante.com/free-proxy-list/',
'https://www.nntime.com/proxy-list/',
'https://www.proxylistdaily.com/',
'https://www.proxydocker.com/en/proxylist/download',
'https://www.proxy-list.download/api/v1/get?type=socks4',
'https://www.proxy-list.download/api/v1/get?type=socks5',
'https://www.proxyvigilante.com/proxy-list/',
'https://www.proxy-list.download/api/v1/get?type=https',
'https://www.freetheproxy.com/proxies/',
'https://www.proxy-seek.com/free-proxy-list',
'https://api.proxyscrape.com/?request=getproxies&protocol=https',
'https://www.proxylistproject.com/free-proxy-list/',
'https://raw.githubusercontent.com/proxy-list/proxy-list/master/proxy-list.txt',
'https://proxydb.net/api/proxy-list?limit=100',
'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/http/http.txt',
'https://raw.githubusercontent.com/roosterkid/openproxylist/main/HTTPS_RAW.txt',
'https://raw.githubusercontent.com/yuceltoluyag/GoodProxy/main/raw.txt',
'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/http.txt',
'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies.txt',
'http://worm.rip/http.txt',
'http://worm.rip/https.txt',
'https://api.openproxylist.xyz/http.txt',
'http://rootjazz.com/proxies/proxies.txt',
'https://multiproxy.org/txt_all/proxy.txt',
'https://proxy-spider.com/api/proxies.example.txt',
'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt',
'https://raw.githubusercontent.com/mmpx12/proxy-list/master/https.txt',
'https://api.proxyscrape.com/v2/?request=displayproxies',
'https://raw.githubusercontent.com/zloi-user/hideip.me/main/socks5.txt',
'https://raw.githubusercontent.com/zloi-user/hideip.me/main/socks4.txt',
'https://raw.githubusercontent.com/zloi-user/hideip.me/main/https.txt',
'https://raw.githubusercontent.com/zloi-user/hideip.me/main/connect.txt',
'https://raw.githubusercontent.com/zevtyardt/proxy-list/main/all.txt',
'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/socks5.txt',
'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/socks4.txt',
'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/proxy.txt',
'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/https.txt',
'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/http.txt',
'https://raw.githubusercontent.com/yuceltoluyag/GoodProxy/main/raw.txt',
'https://raw.githubusercontent.com/yogendratamang48/ProxyList/master/proxies.txt',
'https://raw.githubusercontent.com/yemixzy/proxy-list/master/proxies.txt',
'https://raw.githubusercontent.com/yemixzy/proxy-list/main/proxies/unchecked.txt',
'https://raw.githubusercontent.com/Vann-Dev/proxy-list/main/proxies/socks5.txt',
'https://raw.githubusercontent.com/Vann-Dev/proxy-list/main/proxies/socks4.txt',
'https://raw.githubusercontent.com/Vann-Dev/proxy-list/main/proxies/https.txt',
'https://raw.githubusercontent.com/Vann-Dev/proxy-list/main/proxies/http.txt',
'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/socks5.txt',
'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/socks4.txt',
'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/proxylist.txt',
'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/https.txt',
'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/http.txt',
'https://raw.githubusercontent.com/UptimerBot/proxy-list/main/proxies/socks5.txt',
'https://raw.githubusercontent.com/UptimerBot/proxy-list/main/proxies/socks4.txt',
'https://raw.githubusercontent.com/UptimerBot/proxy-list/main/proxies/http.txt',
'https://raw.githubusercontent.com/tuanminpay/live-proxy/master/socks5.txt',
'https://raw.githubusercontent.com/TuanMinPay/live-proxy/master/socks5.txt',
'https://raw.githubusercontent.com/tuanminpay/live-proxy/master/socks4.txt',
'https://raw.githubusercontent.com/TuanMinPay/live-proxy/master/socks4.txt',
'https://raw.githubusercontent.com/tuanminpay/live-proxy/master/http.txt',
'https://raw.githubusercontent.com/TuanMinPay/live-proxy/master/http.txt',
'https://raw.githubusercontent.com/tuanminpay/live-proxy/master/all.txt',
'https://raw.githubusercontent.com/TuanMinPay/live-proxy/master/all.txt',
'https://raw.githubusercontent.com/Tsprnay/Proxy-lists/master/proxies/https.txt',
'https://raw.githubusercontent.com/Tsprnay/Proxy-lists/master/proxies/http.txt',
'https://raw.githubusercontent.com/Tsprnay/Proxy-lists/master/proxies/all.txt',
'https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/socks5.txt',
'https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/http.txt',
'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/socks5.txt',
'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/socks4.txt',
'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt',
'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/blob/master/socks4.txt',
'https://raw.githubusercontent.com/sunny9577/proxy-scraper/master/proxies.txt',
'https://raw.githubusercontent.com/sunny9577/proxy-scraper/master/generated/socks5_proxies.txt',
'https://raw.githubusercontent.com/sunny9577/proxy-scraper/master/generated/socks4_proxies.txt',
'https://raw.githubusercontent.com/sunny9577/proxy-scraper/master/generated/http_proxies.txt',
'https://raw.githubusercontent.com/sunny9577/proxy-scraper/main/proxies.txt',
'https://raw.githubusercontent.com/sunny9577/proxy-scraper/main/generated/socks5_proxies.txt',
'https://raw.githubusercontent.com/sunny9577/proxy-scraper/main/generated/socks4_proxies.txt',
'https://raw.githubusercontent.com/sunny9577/proxy-scraper/main/generated/http_proxies.txt',
'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/socks5.txt',
'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/socks4.txt',
'https://raw.githubusercontent.com/shiftytr/proxy-list/master/proxy.txt',
'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/proxy.txt',
'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/https.txt',
'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/http.txt',
'https://raw.githubusercontent.com/saschazesiger/Free-Proxies/master/proxies/working.txt',
'https://raw.githubusercontent.com/saschazesiger/Free-Proxies/master/proxies/ultrafast.txt',
'https://raw.githubusercontent.com/saschazesiger/Free-Proxies/master/proxies/socks5.txt',
'https://raw.githubusercontent.com/saschazesiger/Free-Proxies/master/proxies/socks4.txt',
'https://raw.githubusercontent.com/saschazesiger/Free-Proxies/master/proxies/premium.txt',
'https://raw.githubusercontent.com/saschazesiger/Free-Proxies/master/proxies/new.txt',
'https://raw.githubusercontent.com/saisuiu/Lionkings-Http-Proxys-Proxies/main/free.txt',
'https://raw.githubusercontent.com/saisuiu/Lionkings-Http-Proxys-Proxies/main/cnfree.txt',
'https://raw.githubusercontent.com/RX4096/proxy-list/main/online/socks5.txt',
'https://raw.githubusercontent.com/RX4096/proxy-list/main/online/socks4.txt',
'https://raw.githubusercontent.com/RX4096/proxy-list/main/online/https.txt',
'https://raw.githubusercontent.com/RX4096/proxy-list/main/online/http.txt',
'https://raw.githubusercontent.com/rx443/proxy-list/main/online/https.txt',
'https://raw.githubusercontent.com/rx443/proxy-list/main/online/http.txt',
'https://raw.githubusercontent.com/roosterkid/openproxylist/main/SOCKS5_RAW.txt',
'https://raw.githubusercontent.com/roosterkid/openproxylist/main/SOCKS4_RAW.txt',
'https://raw.githubusercontent.com/roosterkid/openproxylist/main/HTTPS_RAW.txt',
'https://raw.githubusercontent.com/roosterkid/openproxylist/main/HTTPS_RAW.txt',
'https://raw.githubusercontent.com/roosterkid/openproxylist/main/HTTP_RAW.txt',
'https://raw.githubusercontent.com/rdavydov/proxy-list/main/proxies_anonymous/socks5.txt',
'https://raw.githubusercontent.com/rdavydov/proxy-list/main/proxies_anonymous/socks4.txt',
'https://raw.githubusercontent.com/rdavydov/proxy-list/main/proxies_anonymous/http.txt',
'https://raw.githubusercontent.com/rdavydov/proxy-list/main/proxies/socks5.txt',
'https://raw.githubusercontent.com/rdavydov/proxy-list/main/proxies/socks4.txt',
'https://raw.githubusercontent.com/rdavydov/proxy-list/main/proxies/http.txt',
'https://raw.githubusercontent.com/prxchk/proxy-list/main/socks5.txt',
'https://raw.githubusercontent.com/prxchk/proxy-list/main/socks4.txt',
'https://raw.githubusercontent.com/prxchk/proxy-list/main/https.txt',
'https://raw.githubusercontent.com/prxchk/proxy-list/main/http.txt',
'https://raw.githubusercontent.com/prxchk/proxy-list/main/all.txt',
'https://raw.githubusercontent.com/ProxyScraper/ProxyScraper/main/socks5.txt',
'https://raw.githubusercontent.com/ProxyScraper/ProxyScraper/main/socks4.txt',
'https://raw.githubusercontent.com/ProxyScraper/ProxyScraper/main/http.txt',
'https://raw.githubusercontent.com/proxylist-to/proxy-list/main/socks5.txt',
'https://raw.githubusercontent.com/proxylist-to/proxy-list/main/socks4.txt',
'https://raw.githubusercontent.com/proxylist-to/proxy-list/main/http.txt',
'https://raw.githubusercontent.com/proxy4parsing/proxy-list/main/https.txt',
'https://raw.githubusercontent.com/proxy4parsing/proxy-list/main/http.txt',
'https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/protocols/http/data.txt',
'https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/all/data.txt',
'https://raw.githubusercontent.com/opsxcq/proxy-list/master/list.txt',
'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/xResults/RAW.txt',
'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/xResults/old-data/Proxies.txt',
'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/socks5/socks5.txt',
'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/socks4/socks4.txt',
'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/https/https.txt',
'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/http/http.txt',
'https://raw.githubusercontent.com/ObcbO/getproxy/master/socks5.txt',
'https://raw.githubusercontent.com/ObcbO/getproxy/master/socks4.txt',
'https://raw.githubusercontent.com/ObcbO/getproxy/master/https.txt',
'https://raw.githubusercontent.com/ObcbO/getproxy/master/http.txt',
'https://raw.githubusercontent.com/ObcbO/getproxy/master/file/socks5.txt',
'https://raw.githubusercontent.com/ObcbO/getproxy/master/file/socks4.txt',
'https://raw.githubusercontent.com/ObcbO/getproxy/master/file/https.txt',
'https://raw.githubusercontent.com/ObcbO/getproxy/master/file/http.txt',
'https://raw.githubusercontent.com/mython-dev/free-proxy-4000/main/proxy-4000.txt',
'https://raw.githubusercontent.com/MuRongPIG/Proxy-Master/main/socks5.txt',
'https://raw.githubusercontent.com/MuRongPIG/Proxy-Master/main/socks4.txt',
'https://raw.githubusercontent.com/MuRongPIG/Proxy-Master/main/https.txt',
'https://raw.githubusercontent.com/MuRongPIG/Proxy-Master/main/http.txt',
'https://raw.githubusercontent.com/MrMarble/proxy-list/main/all.txt',
'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies_anonymous/socks5.txt',
'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies_anonymous/socks4.txt',
'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies_anonymous/http.txt',
'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/socks5.txt',
'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/socks4.txt',
'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/https.txt',
'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt',
'https://raw.githubusercontent.com/mmpx12/proxy-list/master/socks5.txt',
'https://raw.githubusercontent.com/mmpx12/proxy-list/master/socks4.txt',
'https://raw.githubusercontent.com/mmpx12/proxy-list/master/https.txt',
'https://raw.githubusercontent.com/mmpx12/proxy-list/master/http.txt',
'https://raw.githubusercontent.com/miyukii-chan/proxy-list/master/proxies/http.txt',
'https://raw.githubusercontent.com/mishakorzik/Free-Proxy/main/proxy.txt',
'https://raw.githubusercontent.com/mertguvencli/http-proxy-list/main/proxy-list/data.txt',
'https://raw.githubusercontent.com/manuGMG/proxy-365/main/SOCKS5.txt',
'https://raw.githubusercontent.com/mallisc5/master/proxy-list-raw.txt',
'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies.txt',
'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies-socks5.txt',
'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies-socks4.txt',
'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies-https.txt',
'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies-http.txt',
'https://raw.githubusercontent.com/j0rd1s3rr4n0/api/main/proxy/http.txt',
'https://raw.githubusercontent.com/ItzRazvyy/ProxyList/main/socks5.txt',
'https://raw.githubusercontent.com/ItzRazvyy/ProxyList/main/socks4.txt',
'https://raw.githubusercontent.com/ItzRazvyy/ProxyList/main/https.txt',
'https://raw.githubusercontent.com/ItzRazvyy/ProxyList/main/http.txt',
'https://raw.githubusercontent.com/im-razvan/proxy_list/main/socks5',
'https://raw.githubusercontent.com/im-razvan/proxy_list/main/http.txt',
'https://raw.githubusercontent.com/HyperBeats/proxy-list/main/socks5.txt',
'https://raw.githubusercontent.com/HyperBeats/proxy-list/main/socks4.txt',
'https://raw.githubusercontent.com/HyperBeats/proxy-list/main/https.txt',
'https://raw.githubusercontent.com/HyperBeats/proxy-list/main/http.txt',
'https://raw.githubusercontent.com/hookzof/socks5_list/master/proxy.txt',
'https://raw.githubusercontent.com/hendrikbgr/Free-Proxy-Repo/master/proxy_list.txt',
'https://raw.githubusercontent.com/fate0/proxylist/master/proxy.list',
'https://raw.githubusercontent.com/fahimscirex/proxybd/master/proxylist/socks4.txt',
'https://raw.githubusercontent.com/fahimscirex/proxybd/master/proxylist/http.txt',
'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/socks5.txt',
'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/socks4.txt',
'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/https.txt',
'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/http.txt',
'https://raw.githubusercontent.com/enseitankado/proxine/main/proxy/socks5.txt',
'https://raw.githubusercontent.com/enseitankado/proxine/main/proxy/socks4.txt',
'https://raw.githubusercontent.com/enseitankado/proxine/main/proxy/https.txt',
'https://raw.githubusercontent.com/enseitankado/proxine/main/proxy/http.txt',
'https://raw.githubusercontent.com/elliottophellia/yakumo/master/results/socks5/global/socks5_checked.txt',
'https://raw.githubusercontent.com/elliottophellia/yakumo/master/results/socks4/global/socks4_checked.txt',
'https://raw.githubusercontent.com/elliottophellia/yakumo/master/results/mix_checked.txt',
'https://raw.githubusercontent.com/elliottophellia/yakumo/master/results/http/global/http_checked.txt',
'https://raw.githubusercontent.com/dunno10-a/proxy/main/proxies/socks5.txt',
'https://raw.githubusercontent.com/dunno10-a/proxy/main/proxies/socks4.txt',
'https://raw.githubusercontent.com/dunno10-a/proxy/main/proxies/https.txt',
'https://raw.githubusercontent.com/dunno10-a/proxy/main/proxies/http.txt',
'https://raw.githubusercontent.com/dunno10-a/proxy/main/proxies/all.txt',
'https://raw.githubusercontent.com/Daesrock/XenProxy/main/socks5.txt',
'https://raw.githubusercontent.com/Daesrock/XenProxy/main/socks4.txt',
'https://raw.githubusercontent.com/Daesrock/XenProxy/main/proxylist.txt',
'https://raw.githubusercontent.com/Daesrock/XenProxy/main/https.txt',
'https://raw.githubusercontent.com/crackmag/proxylist/proxy/proxy.list',
'https://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list.txt',
'https://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list-raw.txt',
'https://raw.githubusercontent.com/casals-ar/proxy-list/main/socks5',
'https://raw.githubusercontent.com/casals-ar/proxy-list/main/socks4',
'https://raw.githubusercontent.com/casals-ar/proxy-list/main/https',
'https://raw.githubusercontent.com/casals-ar/proxy-list/main/http',
'https://raw.githubusercontent.com/caliphdev/Proxy-List/master/http.txt',
'https://raw.githubusercontent.com/caliphdev/Proxy-List/main/socks5.txt',
'https://raw.githubusercontent.com/caliphdev/Proxy-List/main/http.txt',
'https://raw.githubusercontent.com/BreakingTechFr/Proxy_Free/main/proxies/socks5.txt',
'https://raw.githubusercontent.com/BreakingTechFr/Proxy_Free/main/proxies/socks4.txt',
'https://raw.githubusercontent.com/BreakingTechFr/Proxy_Free/main/proxies/https.txt',
'https://raw.githubusercontent.com/BreakingTechFr/Proxy_Free/main/proxies/http.txt',
'https://raw.githubusercontent.com/BreakingTechFr/Proxy_Free/main/proxies/all.txt',
'https://raw.githubusercontent.com/BlackCage/Proxy-Scraper-and-Verifier/main/Proxies/Not_Processed/proxies.txt',
'https://raw.githubusercontent.com/berkay-digital/Proxy-Scraper/main/proxies.txt',
'https://raw.githubusercontent.com/B4RC0DE-TM/proxy-list/main/HTTP.txt',
'https://raw.githubusercontent.com/aslisk/proxyhttps/main/https.txt',
'https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/main/proxy_files/socks5_proxies.txt',
'https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/main/proxy_files/socks4_proxies.txt',
'https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/main/proxy_files/https_proxies.txt',
'https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/main/proxy_files/http_proxies.txt',
'https://raw.githubusercontent.com/andigwandi/free-proxy/main/proxy_list.txt',
'https://raw.githubusercontent.com/almroot/proxylist/master/list.txt',
'https://raw.githubusercontent.com/ALIILAPRO/Proxy/main/socks5.txt',
'https://raw.githubusercontent.com/ALIILAPRO/Proxy/main/http.txt',
'https://raw.githubusercontent.com/a2u/free-proxy-list/master/free-proxy-list.txt',
'https://proxyspace.pro/socks5.txt',
'https://proxyspace.pro/socks4.txt',
'https://proxyspace.pro/https.txt',
'https://proxyspace.pro/http.txt',
'https://proxy-spider.com/api/proxies.example.txt',
'https://openproxylist.xyz/socks5.txt',
'https://openproxylist.xyz/socks4.txt',
'https://openproxylist.xyz/https.txt',
'https://openproxylist.xyz/http.txt',
'https://naawy.com/api/public/proxylist/getList/?proxyType=socks5&format=txt',
'https://naawy.com/api/public/proxylist/getList/?proxyType=socks4&format=txt',
'https://naawy.com/api/public/proxylist/getList/?proxyType=https&format=txt',
'https://naawy.com/api/public/proxylist/getList/?proxyType=http&format=txt',
'https://multiproxy.org/txt_all/proxy.txt',
'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=anonymous',
'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all',
'https://api.proxyscrape.com/v2/?request=displayproxies',
'https://api.proxyscrape.com/?request=getproxies&proxytype=http&timeout=10000&country=all&ssl=all&anonymity=all',
'https://api.proxyscrape.com/?request=displayproxies&proxytype=http',
'https://api.openproxylist.xyz/socks5.txt',
'https://api.openproxylist.xyz/socks4.txt',
'https://api.openproxylist.xyz/http.txt',
'https://api.good-proxies.ru/getfree.php?count=1000&key=freeproxy', 'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all',
'https://www.proxydocker.com/en/proxylist/download?email=noshare&country=all&city=all&port=all&type=all&anonymity=all&state=all&need=all',
'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=anonymous',
'https://raw.githubusercontent.com/MuRongPIG/Proxy-Master/main/http.txt',
'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/https.txt',
'https://raw.githubusercontent.com/proxylist-to/proxy-list/main/http.txt',
'https://raw.githubusercontent.com/hookzof/socks5_list/master/proxy.txt',
'https://raw.githubusercontent.com/sunny9577/proxy-scraper/master/proxies.txt',
'https://raw.githubusercontent.com/opsxcq/proxy-list/master/list.txt',
'https://api.proxyscrape.com/v2/?request=getproxies&protocol=https',
'http://worm.rip/https.txt',
'https://www.proxy-list.download/api/v1/get?type=http',
'https://www.proxy-list.download/api/v1/get?type=https',
'https://api.openproxylist.xyz/https.txt',
'http://atomintersoft.com/proxy_list_port_80',
'http://atomintersoft.com/proxy_list_domain_org',
'http://atomintersoft.com/proxy_list_port_3128',
'http://alexa.lr2b.com/proxylist.txt',
'http://browse.feedreader.com/c/Proxy_Server_List-1/449196258',
'http://free-ssh.blogspot.com/feeds/posts/default',
'http://browse.feedreader.com/c/Proxy_Server_List-1/449196259',
'http://johnstudio0.tripod.com/index1.htm',
'http://atomintersoft.com/transparent_proxy_list',
'http://atomintersoft.com/anonymous_proxy_list',
'http://atomintersoft.com/high_anonymity_elite_proxy_list',
'http://worm.rip/http.txt',
'http://rootjazz.com/proxies/proxies.txt',
'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies.txt',
'https://raw.githubusercontent.com/hookzof/socks5_list/master/proxy.txt',
'https://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list-raw.txt',
'https://api.proxyscrape.com/v2/?request=displayproxies',
'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/http/http.txt',
'https://raw.githubusercontent.com/roosterkid/openproxylist/main/HTTPS_RAW.txt',
'https://raw.githubusercontent.com/yuceltoluyag/GoodProxy/main/raw.txt',
'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/http.txt',
'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/https.txt',
'https://raw.githubusercontent.com/mmpx12/proxy-list/master/https.txt',
'https://proxyspace.pro/http.txt',
'https://api.proxyscrape.com/?request=displayproxies&proxytype=http',
'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt',
'http://worm.rip/http.txt',
'http://worm.rip/https.txt',
'https://api.openproxylist.xyz/http.txt',
'http://rootjazz.com/proxies/proxies.txt',
'https://multiproxy.org/txt_all/proxy.txt',
'https://proxy-spider.com/api/proxies.example.txt',
'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt',
'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies.txt',
'https://raw.githubusercontent.com/hookzof/socks5_list/master/proxy.txt',
'https://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list-raw.txt',
'https://raw.githubusercontent.com/sunny9577/proxy-scraper/master/proxies.txt',
'https://raw.githubusercontent.com/opsxcq/proxy-list/master/list.txt',
'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all',
'https://www.proxydocker.com/en/proxylist/download?email=noshare&country=all&city=all&port=all&type=all&anonymity=all&state=all&need=all',
'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=anonymous',
'https://raw.githubusercontent.com/roosterkid/openproxylist/main/HTTPS_RAW.txt',
'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt',
'https://raw.githubusercontent.com/MuRongPIG/Proxy-Master/main/http.txt',
'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/http/http.txt',
'https://raw.githubusercontent.com/prxchk/proxy-list/main/http.txt',
'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt',
'https://raw.githubusercontent.com/proxylist-to/proxy-list/main/http.txt',
'https://raw.githubusercontent.com/yuceltoluyag/GoodProxy/main/raw.txt',
'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/http.txt',
'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/https.txt',
'https://raw.githubusercontent.com/mmpx12/proxy-list/master/https.txt',
'https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/main/proxy_files/http_proxies.txt',
'https://raw.githubusercontent.com/opsxcq/proxy-list/master/list.txt',
'https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/main/proxy_files/https_proxies.txt',
'https://api.openproxylist.xyz/http.txt',
'https://api.proxyscrape.com/v2/?request=displayproxies',
'https://api.proxyscrape.com/?request=displayproxies&proxytype=http',
'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all',
'https://www.proxydocker.com/en/proxylist/download?email=noshare&country=all&city=all&port=all&type=all&anonymity=all&state=all&need=all',
'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=anonymous',
'http://worm.rip/http.txt',
'https://proxyspace.pro/http.txt',
'https://multiproxy.org/txt_all/proxy.txt',
'https://proxy-spider.com/api/proxies.example.txt',
'https://sunny9577.github.io/proxy-scraper/proxies.txt',
'https://sunny9577.github.io/proxy-scraper/generated/http_proxies.txt',
'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies_anonymous/http.txt',
'https://raw.githubusercontent.com/zloi-user/hideip.me/main/http.txt',
'https://www.proxy-list.download/api/v1/get?type=http',
'https://raw.githubusercontent.com/zloi-user/hideip.me/main/https.txt',
'https://api.proxyscrape.com/v2/?request=displayproxies&protocol=socks4&timeout=5000&country=all&ssl=all&anonymity=all',
'https://sunny9577.github.io/proxy-scraper/generated/socks4_proxies.txt',
'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/socks4.txt',
'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies_anonymous/socks4.txt',
'https://api.proxyscrape.com/v2/?request=displayproxies&protocol=socks5&timeout=5000&country=all&ssl=all&anonymity=all',
'https://sunny9577.github.io/proxy-scraper/generated/socks5_proxies.txt',
'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/socks5.txt',
'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies_anonymous/socks5.txt',
'https://raw.githubusercontent.com/zloi-user/hideip.me/main/socks5.txt',
'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/http.txt',
'https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/http.txt',
'https://raw.githubusercontent.com/saisuiu/Lionkings-Http-Proxys-Proxies/main/free.txt',
'https://raw.githubusercontent.com/caliphdev/Proxy-List/master/http.txt',
'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/https.txt',
'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/http.txt',
'https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/protocols/http/data.txt',
'https://raw.githubusercontent.com/tuanminpay/live-proxy/master/http.txt',
'https://raw.githubusercontent.com/casals-ar/proxy-list/main/https',
'https://raw.githubusercontent.com/casals-ar/proxy-list/main/http',
'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/http.txt',
'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/https.txt',
'https://raw.githubusercontent.com/proxy4parsing/proxy-list/main/http.txt',
'http://atomintersoft.com/proxy_list_port_80',
'http://atomintersoft.com/proxy_list_domain_org',
'http://atomintersoft.com/proxy_list_port_3128',
'http://alexa.lr2b.com/proxylist.txt',
'http://browse.feedreader.com/c/Proxy_Server_List-1/449196258',
'http://free-ssh.blogspot.com/feeds/posts/default',
'http://browse.feedreader.com/c/Proxy_Server_List-1/449196259',
'http://johnstudio0.tripod.com/index1.htm',
'http://atomintersoft.com/transparent_proxy_list',
'http://atomintersoft.com/anonymous_proxy_list',
'http://atomintersoft.com/high_anonymity_elite_proxy_list',
'http://worm.rip/https.txt',
'http://rootjazz.com/proxies/proxies.txt',
'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies.txt',
'https://raw.githubusercontent.com/hookzof/socks5_list/master/proxy.txt'
]


def download_and_save_proxies(url, output_file):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            with open(output_file, 'a') as file:
                file.write(response.text)
                print(f"{Fore.GREEN}Collect {Fore.WHITE}{url} {Fore.GREEN}")
        else:
            print(f"{Fore.RED}Gagal {url}{Fore.RESET}")
    except Exception as e:
        print(f"{Fore.RED}Gagal {url}{Fore.RESET}")

open(output_file, 'w').close()

class Proxy:
    def __init__(self, method, proxy):
        if method.lower() not in ["http", "https"]:
            raise NotImplementedError("Only HTTP and HTTPS are supported")
        self.method = method.lower()
        self.proxy = proxy

    def is_valid(self):
        return re.match(r"\d{1,3}(?:\.\d{1,3}){3}(?::\d{1,5})?$", self.proxy)

    def check(self, site, timeout, user_agent):
        url = self.method + "://" + self.proxy
        proxy_support = urllib.request.ProxyHandler({self.method: url})
        opener = urllib.request.build_opener(proxy_support)
        urllib.request.install_opener(opener)
        req = urllib.request.Request(self.method + "://" + site)
        req.add_header("User-Agent", user_agent)
        try:
            start_time = time()
            urllib.request.urlopen(req, timeout=timeout)
            end_time = time()
            time_taken = end_time - start_time
            return True, time_taken, None
        except Exception as e:
            return False, 0, e

    def __str__(self):
        return self.proxy

def verbose_print(verbose, message):
    if verbose:
        print(message)

def check(file, timeout, method, site, verbose, random_user_agent):
    proxies = []
    with open(file, "r") as f:
        for line in f:
            proxies.append(Proxy(method, line.replace("\n", "")))

    print(f"{Fore.GREEN}Checking {Fore.YELLOW}{len(proxies)} {Fore.GREEN}Proxy")
    proxies = filter(lambda x: x.is_valid(), proxies)
    valid_proxies = []
    user_agent = random.choice(user_agents)

    def check_proxy(proxy, user_agent):
        new_user_agent = user_agent
        if random_user_agent:
            new_user_agent = random.choice(user_agents)
        valid, time_taken, error = proxy.check(site, timeout, new_user_agent)
        message = {
            True: f"{proxy} is valid, took {time_taken} seconds",
            False: f"{proxy} is invalid: {repr(error)}",
        }[valid]
        verbose_print(verbose, message)
        valid_proxies.extend([proxy] if valid else [])

    threads = []
    for proxy in proxies:
        t = threading.Thread(target=check_proxy, args=(proxy, user_agent))
        threads.append(t)

    for t in threads:
        t.start()

    for t in threads:
        t.join()

    with open(file, "w") as f:
        for proxy in valid_proxies:
            f.write(str(proxy) + "\n")

    print(f"{Fore.GREEN}Found {Fore.YELLOW}{len(valid_proxies)} {Fore.GREEN}valid proxies")


def verbose_print(verbose, message):
    if verbose:
        print(message)

for url in proxy_urls:
    download_and_save_proxies(url, output_file)
    
with open('proxy.txt', 'r') as ceki:
    jumlh = sum(1 for line in ceki)
    
print(f"\n{Fore.WHITE}( {Fore.YELLOW}{jumlh} {Fore.WHITE}) {Fore.GREEN}Proxy Sudah Di Unduh, Mau Check? {Fore.WHITE}({Fore.GREEN}Y{Fore.WHITE}/{Fore.RED}N{Fore.WHITE}): ", end="")
choice = input().strip().lower()

if choice == 'y' or choice == 'Y':
    user_agents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:54.0) Gecko/20100101 Firefox/54.0",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/605.1.15",
    ]
    
    parser = argparse.ArgumentParser()
    parser.add_argument("-t", "--timeout", type=int, default=20, help="Dismiss the proxy after -t seconds")
    parser.add_argument("-p", "--proxy", default="http", help="Check HTTPS or HTTP proxies")
    parser.add_argument("-s", "--site", default="https://google.com/", help="Check with specific website like google.com")
    parser.add_argument("-v", "--verbose", action="store_true", help="Increase output verbosity")
    parser.add_argument("-r", "--random_agent", action="store_true", help="Use a random user agent per proxy")
    
    args = parser.parse_args()
    check(file=output_file, timeout=args.timeout, method=args.proxy, site=args.site, verbose=args.verbose, random_user_agent=args.random_agent)
    sys.exit(0)
else:
    print(f"{Fore.YELLOW}Terima Kasih, Telah Menggunakan Script Saya!.\n")
