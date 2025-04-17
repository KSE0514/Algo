import sys
input = sys.stdin.readline

N = int(input())
numbers = list(map(int, input().split()))

cnt = 0
for n in numbers:
    flag = 0
    if n != 1:
        for d in range(2, n):
            if n % d == 0:
                flag = 1
                break
        if flag == 0:
            cnt += 1
print(cnt)