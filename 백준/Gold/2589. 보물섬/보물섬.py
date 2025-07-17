import sys
input = sys.stdin.readline
from collections import deque

def bfs(start):
    global max_len
    Q = deque()
    Q.append(start)
    visited = [[0]*M for _ in range(N)]
    visited[start[0]][start[1]] = 1
    while Q:
        curR, curC = Q.popleft()
        for r, c in [[1, 0], [-1, 0], [0, 1], [0, -1]]:
            newR = curR + r
            newC = curC + c
            if 0 <= newR < N and 0 <= newC < M and arr[newR][newC] == 'L' and not visited[newR][newC]:
                visited[newR][newC] = visited[curR][curC] + 1
                max_len = max(max_len, visited[newR][newC])
                Q.append((newR, newC))

N, M = map(int, input().split())
arr = [input() for _ in range(N)]
max_len = 0
for row in range(N):
    for col in range(M):
        if arr[row][col] == 'L':
            bfs((row, col))

print(max_len-1)