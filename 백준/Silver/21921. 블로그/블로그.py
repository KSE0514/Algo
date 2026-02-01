import sys
input = sys.stdin.readline

N, X = map(int, input().split())
arr = list(map(int, input().split()))
sumV = 0
edIdx = X - 1
for i in range(0, X):
    sumV += arr[i]

maxV = sumV
maxCnt = 1
while edIdx + 1 < N:
    edIdx += 1
    sumV += arr[edIdx] - arr[edIdx - X]
    if sumV > maxV:
        maxV = sumV
        maxCnt = 1
    elif sumV == maxV:
        maxCnt += 1
if maxV == 0:
    print('SAD')
else:
    print(maxV)
    print(maxCnt)