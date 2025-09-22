import sys
input = sys.stdin.readline

K = int(input())
MAX = 8*(10**6)
numbers = [True] * MAX
cnt = 0
for i in range(2, MAX + 1):
    if numbers[i]:
        cnt += 1
        if cnt == K:
            print(i)
            exit()
        for d in range(i, MAX, i):
            numbers[d] = False