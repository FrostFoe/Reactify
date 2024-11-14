import os
import requests
import threading
import random
import re
import time
from urllib.request import ProxyHandler, build_opener, install_opener, Request, urlopen
from colorama import Fore
from tqdm import tqdm
output_file = "proxy.txt"
os.system("cls" if os.name == "nt" else "clear")
print(
    f"""
                     _____      __   ___
                    |_   _|__ _ \ \ / (_)_ _ _  _ ___
                      | |/ _ \ '_\ V /| | '_| || (_-<
                      |_|\___/_|  \_/ |_|_|  \_,_/__/ 
                
                        🚨  Tor Maintenance MENU  🚨
                           (Top-secret Protocols)
             ╚╦═════════════════════════════════════════════╦╝
           ╔══╩═════════════════════════════════════════════╩═══╗
           TorVirus Network | Development By (t.me/Op_TakeDown)
           ╚══╦══════════════════════════════════════════════╦══╝
              ╚══════════════════════════════════════════════╝
"""
)
proxy_urls = [
    "https://api.proxyscrape.com/v2/?request=displayproxies",
    "https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/xResults/Proxies.txt",
    "https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/socks5.txt",
    "https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/socks4.txt",
    "https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/http.txt",
    "https://raw.githubusercontent.com/hookzof/socks5_list/master/proxy.txt",
    "https://raw.githubusercontent.com/sunny9577/proxy-scraper/refs/heads/master/proxies.txt",
    "https://raw.githubusercontent.com/MuRongPIG/Proxy-Master/refs/heads/main/http.txt",
    "https://raw.githubusercontent.com/MuRongPIG/Proxy-Master/refs/heads/main/socks4.txt",
    "https://raw.githubusercontent.com/MuRongPIG/Proxy-Master/refs/heads/main/socks5.txt",
    "https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/socks4.txt",
    "https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/socks5.txt",
    "https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/http.txt",
    "https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/refs/heads/main/proxy_files/http_proxies.txt",
    "https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/refs/heads/main/proxy_files/socks4_proxies.txt",
    "https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/refs/heads/main/proxy_files/socks5_proxies.txt",
    "https://raw.githubusercontent.com/vakhov/fresh-proxy-list/refs/heads/master/http.txt",
    "https://raw.githubusercontent.com/vakhov/fresh-proxy-list/refs/heads/master/socks4.txt",
    "https://raw.githubusercontent.com/vakhov/fresh-proxy-list/refs/heads/master/socks5.txt",
    ]
user_agents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
]
if os.path.isfile(output_file):
    os.remove(output_file)
open(output_file, "w").close()
def download_and_save_proxies(url, output_file):
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            with open(output_file, "a") as file:
                file.write(response.text)
    except requests.RequestException as e:
        print(f"{Fore.RED}Failed to download from {url}{Fore.RESET}")
for url in proxy_urls:
    download_and_save_proxies(url, output_file)
class Proxy:
    def __init__(self, method, proxy):
        if method.lower() not in ["http", "https"]:
            raise ValueError("Only HTTP and HTTPS proxies are supported")
        self.method = method.lower()
        self.proxy = proxy
    def is_valid(self):
        return re.match(r"\d{1,3}(?:\.\d{1,3}){3}(?::\d{1,5})?$", self.proxy)
    def check(self, site, timeout, user_agent):
        proxies = {self.method: f"{self.method}://{self.proxy}"}
        headers = {"User-Agent": user_agent}
        try:
            response = requests.get(
                f"{self.method}://{site}",
                proxies=proxies,
                headers=headers,
                timeout=timeout,
            )
            return response.ok
        except requests.RequestException:
            return False
    def __str__(self):
        return self.proxy
def check(file, timeout, method, site, random_user_agent=False):
    proxies = []
    with open(file, "r") as f:
        for line in f:
            proxies.append(Proxy(method, line.strip()))
    proxies = list(filter(lambda x: x.is_valid(), proxies))
    valid_proxies = []
    progress_bar = tqdm(total=len(proxies), desc="Checking Zombies", unit="Zombies")
    def check_proxy(proxy):
        user_agent = random.choice(user_agents) if random_user_agent else user_agents[0]
        if proxy.check(site, timeout, user_agent):
            valid_proxies.append(proxy)
        progress_bar.update(1)
    threads = []
    for proxy in proxies:
        t = threading.Thread(target=check_proxy, args=(proxy,))
        threads.append(t)
        t.start()
    for t in threads:
        t.join()
    progress_bar.close()
    with open(file, "w") as f:
        for proxy in valid_proxies:
            f.write(str(proxy) + "\n")
for url in proxy_urls:
    download_and_save_proxies(url, output_file)
with open(output_file, "r") as f:
    total_proxies = sum(1 for _ in f)
print(f"{Fore.YELLOW}Total Zombies Infected: {total_proxies}{Fore.RESET}")
check(
    output_file,
    timeout=25,
    method="http",
    site="https://google.com",
    random_user_agent=True,
)