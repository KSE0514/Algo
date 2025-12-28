import sys
from collections import deque
input = sys.stdin.readline

def bfs(start):
    dq = deque()
    dq.append((start[0], start[1]))
    visited = [[-1] * M for _ in range(N)]
    visited[start[0]][start[1]] = 0

    while dq:
        curR, curC = dq.popleft()

        if maze[curR][curC] == 'G':
            return f"Shortest Path: {visited[curR][curC]}"

        for r, c in [(1, 0), (0, 1), (-1, 0), (0, -1)]:
            newR = curR + r
            newC = curC + c
            if 0 <= newR < N and 0 <= newC < M and maze[newR][newC] != 'X' and visited[newR][newC] == -1:
                visited[newR][newC] = visited[curR][curC] + 1
                dq.append((newR, newC))
    return "No Exit"

T = int(input())
for _ in range(T):
    N, M = map(int, input().split())
    maze = [list(input().strip()) for _ in range(N)]

    start = None

    for r in range(N):
        for c in range(M):
            if maze[r][c] == 'S':
                start = (r, c)
                break
        if start:
            break
    print(bfs(start))