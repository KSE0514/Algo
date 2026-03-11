import sys
input = sys.stdin.readline

arr = list(map(int, input().split()))
sumV = 0

for n in arr:
    sumV += n**2
    sumV %= 10

print(sumV)
