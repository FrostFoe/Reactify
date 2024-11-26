import os
import requests
from colorama import Fore

# Output file to save proxies
output_file = "proxy.txt"

# Clear the terminal screen
os.system("cls" if os.name == "nt" else "clear")

# Print the banner
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

# Proxy URLs to scrape from
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

# Open the output file in write mode to clear previous proxies
with open(output_file, "w") as file:
    pass

# Function to download and save proxies
def download_and_save_proxies(url, output_file):
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            with open(output_file, "a") as file:
                file.write(response.text)
    except requests.RequestException:
        print(f"{Fore.RED}Failed to download from {url}{Fore.RESET}")

# Download proxies from all URLs
for url in proxy_urls:
    download_and_save_proxies(url, output_file)

# Count total proxies and display result
with open(output_file, "r") as f:
    total_proxies = sum(1 for _ in f)
print(f"{Fore.YELLOW}Total Zombies Infected: {total_proxies}{Fore.RESET}")
