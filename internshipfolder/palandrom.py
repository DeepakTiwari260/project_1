# palandrom string
str = input("Enter string: ")
reverse_text = str[::-1]

if str == reverse_text:
    print(True)
else:
    print(False)