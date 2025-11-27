import sys
from collections import deque
input = sys.stdin.readline

def bfs(start):
    dq = deque()
    dq.append(start)
    visited = [[-1]*m for _ in range(n)]
    visited[start[0]][start[1]] = 0

    while dq:
        curR, curC = dq.popleft()
        if arr[curR][curC] in [3, 4, 5]:
            return "TAK", visited[curR][curC]

        for r, c in [(1, 0), (0, 1), (-1, 0), (0, -1)]:
            newR = curR + r
            newC = curC + c
            if 0 <= newR < n and 0 <= newC < m and arr[newR][newC] != 1 and visited[newR][newC] == -1:
                visited[newR][newC] = visited[curR][curC] + 1
                dq.append((newR, newC))
    return "NIE", -1

n, m = map(int, input().split())
arr = [list(map(int, input().strip())) for _ in range(n)]

for r in range(n):
    for c in range(m):
        if arr[r][c] == 2:
            result, d = bfs((r, c))
            print(result)
            if result == "TAK":
                print(d)
            break