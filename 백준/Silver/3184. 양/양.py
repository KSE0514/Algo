import sys
input = sys.stdin.readline
from collections import deque

dx = [1, 0, -1, 0]
dy = [0, 1, 0, -1]

def bfs(start):
    global fox, sheep
    Q = deque()
    visited[start[0]][start[1]] = True
    Q.append(start)
    temp_sheep = 0
    temp_fox = 0
    if arr[start[0]][start[1]] == 'v':
        temp_fox += 1
    else:
        temp_sheep += 1
    while Q:
        curR, curC = Q.popleft()
        for i in range(4):
            newR = curR + dx[i]
            newC = curC + dy[i]
            if 0<= newR < R and 0 <= newC < C and arr[newR][newC] != '#' and not visited[newR][newC]:
                visited[newR][newC] = True
                if arr[newR][newC] == 'v':
                    temp_fox += 1
                elif arr[newR][newC] == 'o':
                    temp_sheep += 1
                Q.append((newR, newC))
    if temp_fox >= temp_sheep:
        fox += temp_fox
    else:
        sheep += temp_sheep



R, C = map(int, input().split())
arr = [input() for _ in range(R)]

visited = [[False] * C for _ in range(R)]
fox = 0
sheep = 0
for row in range(R):
    for col in range(C):
        if not visited[row][col] and (arr[row][col] == 'v' or arr[row][col] == 'o'):
            bfs((row, col))

print(sheep, fox)