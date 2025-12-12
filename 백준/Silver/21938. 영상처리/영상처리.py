import sys
from collections import deque
input = sys.stdin.readline

def bfs(row, col):
    dq = deque()
    dq.append((row, col))
    visited[row][col] = True

    while dq:
        curR, curC = dq.popleft()
        for r, c in [(1, 0), (0, 1), (-1, 0), (0, -1)]:
            newR = curR + r
            newC = curC + c
            if 0 <= newR < N and 0 <= newC < M and new_arr[newR][newC] and not visited[newR][newC]:
                visited[newR][newC] = True
                dq.append((newR, newC))

N, M = map(int, input().split())
arr = [list(map(int, input().split())) for _ in range(N)]
T = int(input())

cnt = 0
new_arr = [[0] * M for _ in range(N)] # 1: 물체, 0: 물체X
# RGB값 평균내어 새로운 화면으로 저장
for r in range(N):
    for c in range(M):
        R = arr[r][c*3]
        G = arr[r][c*3 + 1]
        B = arr[r][c*3 + 2]
        meanV = (R + G + B) / 3
        if meanV >= T:
            new_arr[r][c] = 1

visited = [[False] * M for _ in range(N)]
cnt = 0
for r in range(N):
    for c in range(M):
        if new_arr[r][c] and not visited[r][c]:
            bfs(r, c) # 인접한 물체까지 방문처리
            cnt += 1

print(cnt)