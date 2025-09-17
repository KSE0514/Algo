import sys, random
sys.setrecursionlimit(10**5)
input = sys.stdin.readline

n = int(input())
if n == 1 or n == 2:
    print(1)
    exit()

# gcd
def gcd(x, y):
    while y:
        x, y = y, x % y
    return x

# 밀러-라빈 소수 판별법
def is_prime(n):
    if n < 2:
        return False
    for p in [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]:
        if n % p == 0:
            return n == p

    d, s = n - 1, 0
    while d % 2 == 0:
        d //= 2
        s += 1
    for a in [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]:
        if a >= n:
            continue
        x = pow(a, d, n)
        if x == 1 or x == n - 1:
            continue
        for _ in range(s - 1):
            x = pow(x, 2, n)
            if x == n - 1:
                break
        else:
            return False
    return True

# 폴라드 로
def pollard_rho(n):
    if n % 2 == 0:
        return 2
    if n % 3 == 0:
        return 3
    while True:
        x = random.randrange(2, n)
        y = x
        c = random.randrange(1, n)
        d = 1
        while d == 1:
            x = (pow(x, 2, n) + c) % n
            y = (pow(y, 2, n) + c) % n
            y = (pow(y, 2, n) + c) % n
            d = gcd(abs(x-y), n)
        if d != n:
            return d

# 소인수분해
def factorize(n, res):
    if n == 1:
        return
    if is_prime(n):
        res.append(n)
        return
    d = pollard_rho(n)
    factorize(d, res)
    factorize(n // d, res)

factors = []
factorize(n, factors)
primes = set(factors)
result = n
for p in primes:
    result -= result // p
print(result)



#  ######### 1차 시도_ 시간 초과
# import sys
# # input = sys.stdin.readline
#
# n = int(input())
# if n == 1 or n == 2:
#     print(1)
#     exit()
#
# result = n
# i = 2
# while i * i <= n:
#     if n % i == 0:
#         result -= result // i
#         while n % i == 0:
#             n //= i
#     if i == 2:
#         i = 3
#     else:
#         i += 2
#
# if n > 1:
#     result -= result // n
#
# print(result)