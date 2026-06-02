# armstrong number(153 = 1^3 + 5^3 + 3^3)
num = int(input("Enter number : "))

# find the length of number
order = len(str(num)) # first we convert the num to string to find the length of number.
power_sum = 0
temp = num

while temp>0:
    digit = temp % 10
    power_sum = power_sum + digit**order
    temp = temp // 10

if num == power_sum:
    print(True)
else:
    print(False)


