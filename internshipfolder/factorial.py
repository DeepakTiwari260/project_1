# factorial
num = int(input("Enter a number: "))
factorial = 1

for i in range(1, num + 1): # therefore range go to stop -1
    factorial *= i

print("Factorial of", num, "is", factorial)

