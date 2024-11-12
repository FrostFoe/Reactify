#!/bin/bash

# Function to print a random message from lib/msg.txt
random_task_message() {
    echo "[INFO] $(shuf -n 1 lib/msg.txt)"
}

# Display a random startup message
random_task_message

# Update and install dependencies
sudo apt update -y && sudo apt install -y golang python3-pip nodejs npm

# Install Python and Node.js dependencies
python3 -m pip install --upgrade pip pystyle colorama httpx
npm install --prefix=bin/odd/.cache/ hpack colors user-agents axios request puppeteer-extra --force

# Run TorVirus in the background
random_task_message
bash TorVirus.sh
