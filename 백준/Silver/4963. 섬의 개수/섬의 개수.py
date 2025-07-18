import sys
input = sys.stdin.readline
from collections import deque

dx = [1, 0, -1, 0, 1, -1, 1, -1]
dy = [0, 1, 0, -1, 1, 1, -1, -1]

def bfs(start):
    Q = deque()
    Q.append(start)
    while Q:
        curR, curC = Q.popleft()
        for i in range(8):
            newR = curR + dx[i]
            newC = curC + dy[i]
            if 0 <= newR < h and 0 <= newC < w and arr[newR][newC] == 1:
                arr[newR][newC] = 0
                Q.append((newR, newC))

while True:
    w, h = map(int, input().split()) # 열, 행
    if (w, h) == (0, 0):
        break
    else:
        arr = [list(map(int, input().split())) for _ in range(h)]
        cnt = 0
        for row in range(h):
            for col in range(w):
                if arr[row][col] == 1:
                    cnt += 1
                    arr[row][col] = 0
                    bfs((row, col))

        print(cnt)