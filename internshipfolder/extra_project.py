# Encryption-Decryption
message = input("Enter message: ")

encrypted = ""

for ch in message:
    encrypted += chr(ord(ch) + 3)

print("Encrypted Message:", encrypted)

decrypted = ""

for ch in encrypted:
    decrypted += chr(ord(ch) - 3)

print("Decrypted Message:", decrypted)