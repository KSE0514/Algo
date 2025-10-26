import sys
from collections import deque
input = sys.stdin.readline

def bfs(start):
    dq = deque(start)
    visited = [[0]*N for _ in range(N)]
    max_time = 0
    cnt = M
    for row, col in start:
        visited[row][col] = 1

    while dq:
        curR, curC = dq.popleft()
        if max_time - 1 > min_time:
            return -1
        for r, c in [(1, 0), (0, 1), (-1, 0), (0, -1)]:
            newR = curR + r
            newC = curC + c
            if 0 <= newR < N and 0 <= newC < N and visited[newR][newC] == 0 and arr[newR][newC] != 1:
                cnt += 1
                visited[newR][newC] = visited[curR][curC] + 1
                max_time = max(max_time, visited[newR][newC])
                dq.append((newR, newC))

    if cnt == empty_cnt:
        return max_time - 1
    else:
        return -1

def com(d, st_idx):
    if d == M:
        virus_idx_com.append([*ST])

    for i in range(st_idx, virus_p_cnt):
        ST.append(i)
        com(d+1, i+1)
        ST.pop()

N, M = map(int, input().split())
arr = [list(map(int, input().split())) for _ in range(N)]

virus_p = [] # 바이러스 놓을 수 있는 위치들
empty_cnt = 0 # 바이러스 전파 가능한 공간 수
for r in range(N):
    for c in range(N):
        if arr[r][c] == 2:
            virus_p.append((r, c))
            empty_cnt += 1
        elif arr[r][c] == 0:
            empty_cnt += 1

virus_p_cnt = len(virus_p) # 바이러스 놓을 수 있는 위치 수
if virus_p_cnt == M and empty_cnt == M:
    print(0)
    exit(0)

ST = []
virus_idx_com = [] # 바이러스 놓을 위치 조합
com(0, 0)

min_time = empty_cnt + 1
for idx_com in virus_idx_com:
    start = []
    for idx in idx_com:
        start.append(virus_p[idx])
    bfs_result = bfs(start)
    if bfs_result != -1: # 백트래킹에 걸리지 않고 벽이 아닌 모든칸에 전파할 수 있는 경우에만
        min_time = min(min_time, bfs_result)

# 출력
if min_time == empty_cnt + 1:
    print(-1)
else:
    print(min_time)