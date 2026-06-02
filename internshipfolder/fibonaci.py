a = 0
b = 1

num = int(input("Enter the number of terms of fibonaci sequence"))

print("Fibonaci sequence")
for i in range(1,num+1):
    print(a,end=" ") #end is use to do not move to next line 
    temp = a+b
    a = b
    b = temp

