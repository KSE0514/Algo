import sys
input = sys.stdin.readline
from collections import deque

M, N, H = map(int, input().split()) # 가로(열), 세로(행), 높이
tomatos = [[list(map(int, input().split())) for _ in range(N)] for _ in range(H)] # 3차원 배열 입력 받기

Q = deque()

# 익은 토마토 찾기
for h in range(H):
    for r in range(N):
        col = [idx for idx, value in enumerate(tomatos[h][r]) if value == 1]
        for c in col:
            Q.append((h, r, c))

days = 0
# bfs
while Q:
    curH, curR, curC = Q.popleft()
    for h, r, c in [(0, 1, 0), (0, -1, 0), (0, 0, 1), (0, 0, -1), (1, 0, 0), (-1, 0, 0)]: # 상하우좌앞뒤
        newH = curH + h
        newR = curR + r
        newC = curC + c

        if 0 <= newH <H and 0 <= newR < N and 0<= newC < M and tomatos[newH][newR][newC] == 0:
            # 새 좌표가 범위에 벗어나지 않으면서, 새 좌표의 토마토가 안 익었다면(방문을 안 했다면)
            tomatos[newH][newR][newC] = 1 + tomatos[curH][curR][curC]
            days = max(days, tomatos[newH][newR][newC])
            Q.append((newH, newR, newC))

flag = 0 # 숙성 못 하는 게 존재하는지 확인하는 용도의 플래그
for h in range(H):
    for r in range(N):
        if 0 in tomatos[h][r]:
            flag = 1
    if flag:
        break

# 숙성 못 하는 게 하나라도 있으면 -1 출력, 아니면 필요한 날짜 수 출력
if flag:
    print(-1)
else:
    if days: # 'days == 0이면' === '이미 다 숙성된 상태면'
        print(days - 1)
    else:
        print(days)