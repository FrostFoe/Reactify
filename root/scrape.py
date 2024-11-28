import os
import sys
import httpx
from colorama import Fore, init

init(autoreset=True)

fr = Fore.RED
fg = Fore.GREEN
fy = Fore.YELLOW
fw = Fore.WHITE
fre = Fore.RESET

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


if __name__ == "__main__":
    file = "proxy.txt"

    try:
        if os.path.isfile(file):
            os.system("cls" if os.name == "nt" else "clear")
            os.remove(file)
            print(
                "{}File {} Sudah Ada!\n{}Memulai Mengunduh {} Yang Baru!\n".format(
                    fr, file, fy, file
                )
            )
            with open(file, "a") as data:
                for proxy in list:
                    data.write(httpx.get(proxy).text)
                    print(" -| mengambil {}{}".format(fg, proxy))
        else:
            os.system("cls" if os.name == "nt" else "clear")
            with open(file, "a") as data:
                for proxy in list:
                    data.write(httpx.get(proxy).text)
                    print(" -| mengambil {}{}".format(fg, proxy))

        with open(file, "r") as count:
            total = sum(1 for line in count)
        print("\n{}( {}{} {}) {}Proxy Berhasil Di Unduh.".format(fw, fy, total, fw, fg))

    except IndexError:
        sys.exit(1)
