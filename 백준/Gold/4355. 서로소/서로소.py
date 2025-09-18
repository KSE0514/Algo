import sys
input = sys.stdin.readline

while True:
    n = int(input())
    if n == 0:
        break

    if n <= 2:
        print(n-1)
        continue
    result = n
    i = 2
    while i * i <= n:
        if n % i == 0:
            result -= result // i
            while n % i == 0:
                n //= i
        if i == 2:
            i = 3
        else:
            i += 2
    if n > 1:
        result -= result // n
    print(result)