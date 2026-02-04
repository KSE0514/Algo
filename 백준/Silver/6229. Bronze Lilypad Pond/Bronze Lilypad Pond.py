import sys
from collections import deque
input = sys.stdin.readline

def bfs(start):
    dq = deque()
    dq.append(start)
    visited = [[-1] * N for _ in range(M)]
    visited[start[0]][start[1]] = 0

    while dq:
        curR, curC = dq.popleft()
        if arr[curR][curC] == 4:
            return visited[curR][curC]

        for r, c in [(M1, M2), (M1, -M2), (-M1, M2), (-M1, -M2), (M2, M1), (M2, -M1), (-M2, M1), (-M2, -M1)]:
            newR = curR + r
            newC = curC + c
            if 0 <= newR < M and 0 <= newC < N and arr[newR][newC] != 0  and arr[newR][newC] != 2 and visited[newR][newC] == -1:
                visited[newR][newC] = visited[curR][curC] + 1
                dq.append((newR, newC))

M, N, M1, M2 = map(int, input().split())
arr = [list(map(int, input().split())) for _ in range(M)]

start = None
for r in range(M):
    for c in range(N):
        if arr[r][c] == 3:
            start = (r, c)
    if start:
        break

print(bfs(start))