import sys
from collections import deque
input = sys.stdin.readline

def bfs(stR, stC):
    dq = deque()
    dq.append((stR, stC))

    while dq:
        curR, curC = dq.popleft()
        for r, c in [(1, 0), (0, 1), (-1, 0), (0, -1), (1, 1), (1, -1), (-1, 1), (-1, -1)]:
            newR = curR + r
            newC = curC + c
            if 0 <= newR < m and 0 <= newC < n and arr[newR][newC] == '@' and not visited[newR][newC]:
                visited[newR][newC] = True
                dq.append((newR, newC))

while True:
    m, n = map(int, input().split())
    if m == 0 and n == 0:
        break

    arr = [list(input().strip()) for _ in range(m)]
    cnt = 0
    visited = [[False] * n for _ in range(m)]
    for r in range(m):
        for c in range(n):
            if arr[r][c] == '@' and not visited[r][c]:
                visited[r][c] = True
                cnt += 1
                bfs(r, c)
    print(cnt)
