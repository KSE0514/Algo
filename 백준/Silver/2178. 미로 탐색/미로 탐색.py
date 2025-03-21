# 1: 15~ 51

import sys
from collections import deque
# sys.stdin = open('2178input.txt', "r")
input = sys.stdin.readline


def bfs(s):
    Q = deque()
    Q.append(s)
    row, col = s
    log[row][col] = 1
    while Q:
        row, col = Q.popleft()
        if not visited[row][col]:
            visited[row][col] = True

            # 도착 지점에 도착하면
            if (row, col) == (N-1, M-1):
                result = log[row][col]
                return result

            for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]: # 아래, 위, 오른, 왼
                newR = row + dr
                newC = col + dc
                if 0<= newR < N and 0<= newC < M and arr[newR][newC] == '1' and not visited[newR][newC]:
                    Q.append((newR, newC))
                    log[newR][newC] = log[row][col] + 1

N, M = map(int, input().split())
arr = [list(input()) for _ in range(N)]

# print(arr) # 각 행의 마지막 요소 \n 무시하기 ==> N*(M+1) 행렬
# 도착 좌표: (N-1, M-1)

# 방문 표시
visited = [[False]*(M+1) for _ in range(N)]
log = [[0]*(M+1) for _ in range(N)]
print(bfs((0, 0)))