import sys
from collections import deque
input = sys.stdin.readline

def bfs(stR, stC):
    dq = deque()
    dq.append((stR, stC))
    arr[stR][stC] = 0

    while dq:
        curR, curC = dq.popleft()
        for r, c in [(1, 0), (-1, 0), (0, 1), (0, -1), (1, 1), (1, -1), (-1, 1), (-1, -1)]:
            newR = curR + r
            newC = curC + c
            if 0 <= newR < M and 0 <= newC < N and arr[newR][newC]:
                arr[newR][newC] = 0
                dq.append((newR, newC))

M, N = map(int, input().split()) # 행, 열
arr = [list(map(int, input().split())) for _ in range(M)]

cnt = 0
for r in range(M):
    for c in range(N):
        if arr[r][c]:
            cnt += 1
            bfs(r, c)
print(cnt)