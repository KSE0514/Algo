import sys
input = sys.stdin.readline

N = int(input())
count = [0] * 10001

for _ in range(N):
    num = int(input())
    count[num] += 1   # 해당 숫자가 등장한 횟수 기록

for i in range(10001):
    if count[i] != 0:
        for _ in range(count[i]):
            print(i)