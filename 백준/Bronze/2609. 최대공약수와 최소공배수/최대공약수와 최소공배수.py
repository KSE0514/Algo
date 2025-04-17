import sys
input = sys.stdin.readline

A, B = map(int, input().split())

# 최대공약수
min_num = min(A, B)
for i in range(min_num, 0, -1):
    if A % i == 0 and B % i == 0:
        print(i)
        break

# 최소공배수
max_num = max(A, B)
c = 1
while True:
    l = max_num*c
    if l % A == 0 and l % B == 0:
        print(l)
        break
    else:
        c += 1