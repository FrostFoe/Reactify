from cryptography.fernet import Fernet
import os

# Define key parts
key_part1 = "nGD"
key_part2 = "JA7"
key_part3 = "-hV"
key_part4 = "RNz"
key_part5 = "t3w"
key_part6 = "TnJ"
key_part7 = "cfE"
key_part8 = "HPS"
key_part9 = "jhx"
key_part10 = "3gN"
key_part11 = "DF_"
key_part12 = "WfR"
key_part13 = "XzH"
key_part14 = "oZM"
key_part15 = "s="

# Construct the key
key = (
    key_part1
    + key_part2
    + key_part3
    + key_part4
    + key_part5
    + key_part6
    + key_part7
    + key_part8
    + key_part9
    + key_part10
    + key_part11
    + key_part12
    + key_part13
    + key_part14
    + key_part15
).encode()

# Initialize the Fernet cipher
cipher = Fernet(key)

# Define the file to decrypt and the output file
encrypted_file = "root/menu.py"
decrypted_file = "root/menu_decrypted.py"

# Read the encrypted data
with open(encrypted_file, "rb") as f:
    encrypted_data = f.read()

# Decrypt the data
decrypted_data = cipher.decrypt(encrypted_data)

# Save the decrypted data to a new file
with open(decrypted_file, "wb") as f:
    f.write(decrypted_data)

print(f"Decrypted file saved as: {decrypted_file}")
