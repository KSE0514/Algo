import sys
input = sys.stdin.readline
from collections import deque

M, N = map(int, input().split())
arr = [list(map(int, input().strip())) for _ in range(M)]

dq = deque()
for c in range(N):
    if arr[0][c] == 0:
        dq.append((0, c))
        arr[0][c] = 1

result = "NO"
d = [1, 0, -1, 0]
while dq:
    curR, curC = dq.popleft()
    if curR == M - 1:
        result = "YES"
        break
    for i in range(4):
        newR = curR + d[i]
        newC = curC + d[(i+1)%4]
        if 0 <= newR < M and 0 <= newC < N and arr[newR][newC] == 0:
            arr[newR][newC] = 1
            dq.append((newR, newC))

print(result)