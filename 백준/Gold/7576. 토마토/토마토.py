import sys
input = sys.stdin.readline
from collections import deque

M, N = map(int, input().split()) # 열, 행
tomatos = [list(map(int, input().split())) for _ in range(N)]

Q = deque()
# 익은 토마토 위치 찾아서 Q에 담기
for r in range(N):
    # if 1 in tomatos[r]:
    idxs = [c for c in range(M) if tomatos[r][c] == 1]
    for c in idxs:
        Q.append((r, c))

days = 0
while Q:
    curR, curC = Q.popleft()
    for r, c in [(1, 0), (-1, 0), (0, 1), (0, -1)]: # 하상우좌
        newR = curR + r
        newC = curC + c
        if 0<= newR < N and 0<= newC <M and tomatos[newR][newC] == 0:
            tomatos[newR][newC] = tomatos[curR][curC] + 1
            days = max(days, tomatos[newR][newC])
            Q.append((newR, newC))

# 안 익은 토마토가 있으면 flag == 1
flag = 0
for r in range(N):
    if 0 in tomatos[r]:
        flag = 1
        break

if flag:
    print(-1)
else:
    # 만약 하루도 안 걸렸다면 그래도 출력, 1일 이상 걸렸다면 -1해서 출력
    if days:
        print(days - 1)
    else:
        print(days)