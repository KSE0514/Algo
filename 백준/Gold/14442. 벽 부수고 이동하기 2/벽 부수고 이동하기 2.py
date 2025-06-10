import sys
input = sys.stdin.readline
from collections import deque

N, M, K = map(int, input().split())
arr = [list(map(int, input().strip())) for _ in range(N)]

visited = [[[False]*(K+1) for _ in range(M)] for _ in range(N)]

Q = deque() # 행, 열, 거리, 벽 부순 수
Q.append((0, 0, 1, 0))
visited[0][0][0] = True
minV = N * M + 1
while Q:
    curR, curC, curD, broken = Q.popleft()
    if curR == N - 1 and curC == M - 1:
        minV = curD
        break

    for r, c in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
        newR = curR + r
        newC = curC + c
        # 좌표 범위 넘어가면 넘기기
        if newR < 0 or newR >= N or newC < 0 or newC >= M:
            continue
        # 아직 방문 안 했으면서
        if not visited[newR][newC][broken]:
            # 갈 수 있는 곳이면
            if arr[newR][newC] == 0:
                visited[newR][newC][broken] = True
                Q.append((newR, newC, curD + 1, broken))
            # 벽을 만났을 때 더 부술 수 있으면
            if arr[newR][newC] == 1 and broken + 1 <= K and not visited[newR][newC][broken + 1]:
                visited[newR][newC][broken + 1] = True
                Q.append((newR, newC, curD + 1, broken + 1))

if minV == N*M + 1:
    print(-1)
else:
    print(minV)