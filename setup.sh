random_task_message() {
    echo "[INFO] $(shuf -n 1 lib/msg.txt)"
}

random_task_message
apt update -y && apt install golang python3-pip nodejs npm -y > /dev/null 2>&1

random_task_message
chmod +x root/root.py > /dev/null 2>&1

random_task_message
pip install pystyle colorama httpx tqdm beautifulsoup4 bs4 googlesearch-python > /dev/null 2>&1

random_task_message
npm install --prefix=bin/odd/.cache/ hpack --force > /dev/null 2>&1

random_task_message
python3 -m venv TorNetwork > /dev/null 2>&1

random_task_message
source TorNetwork/bin/activate > /dev/null 2>&1