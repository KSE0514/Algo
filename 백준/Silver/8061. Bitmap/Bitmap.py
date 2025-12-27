import sys
from collections import deque
input = sys.stdin.readline

def bfs():
    dq = deque()
    for r in range(n):
        for c in range(m):
            if arr[r][c]:
                dq.append((r, c))

    while dq:
        curR, curC = dq.popleft()
        for r, c in [(1, 0), (0, 1), (-1, 0), (0, -1)]:
            newR = curR + r
            newC = curC + c
            if 0 <= newR < n and 0 <= newC < m and visited[newR][newC] == 0 and arr[newR][newC] == 0:
                visited[newR][newC] = visited[curR][curC] + 1
                dq.append((newR, newC))

n, m = map(int, input().split())
arr = [list(map(int, input().strip())) for _ in range(n)]
visited = [[0] * m for _ in range(n)]

bfs()
for r in range(n):
    print(*visited[r])