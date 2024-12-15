import os
import sys
import httpx
from concurrent.futures import ThreadPoolExecutor

# Proxy URLs
list = [
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

def fetch_and_write(url, file):
    try:
        response = httpx.get(url, timeout=10)
        if response.status_code == 200:
            with open(file, "a") as data:
                data.write(response.text)
    except Exception:
        pass

if __name__ == "__main__":
    file = "root/proxy.txt"

    try:
        # Clear existing file
        if os.path.isfile(file):
            os.remove(file)

        # Fetch proxies concurrently
        with ThreadPoolExecutor(max_workers=10) as executor:
            executor.map(lambda url: fetch_and_write(url, file), list)

        # Count total proxies
        with open(file, "r") as count:
            total = sum(1 for _ in count)

    except Exception as e:
        sys.exit(1)
