import sys
from collections import deque
input = sys.stdin.readline

def com(d, stIdx):
    if d == M:
        com_virus_list.append([*ST])
        return

    for i in range(stIdx, virus_cnt):
        ST.append(i)
        com(d+1, i+1)
        ST.pop()

def bfs(start):
    dq = deque(start)
    max_time = 0
    visited = [[0] * N for _ in range(N)]
    infected_cnt = 0
    for vi_r, vi_c in start:
        visited[vi_r][vi_c] = 1

    while dq:
        curR, curC = dq.popleft()
        if max_time > min_v:
            return -2
        for r, c in [(1, 0), (0, 1), (-1, 0), (0, -1)]:
            newR = curR + r
            newC = curC + c
            if 0 <= newR < N and 0 <= newC < N and arr[newR][newC] != 1 and not visited[newR][newC]:
                visited[newR][newC] = visited[curR][curC] + 1
                if arr[newR][newC] == 0: # 빈공간이 감염되었을 때만
                    infected_cnt += 1
                    max_time = max(max_time, visited[newR][newC] - 1)
                dq.append((newR, newC))

    if infected_cnt == empty_cnt:
        return max_time
    else:
        return -1

N, M = map(int, input().split())
arr = [list(map(int, input().split())) for _ in range(N)]

virus_list = [] # 모든 바이러스를 담을 배열
empty_cnt = 0
for r in range(N):
    for c in range(N):
        if arr[r][c] == 2:
            virus_list.append((r, c))
        elif arr[r][c] == 0:
            empty_cnt += 1

# 바이러스 조합 만들기
ST = []
com_virus_list = [] # 선택된 M개의 바이러스 (인덱스)조합
virus_cnt = len(virus_list)
com(0, 0)

min_v = empty_cnt
flag = 1 # 전체 확산이 가능한 경우가 한 번이라도 있는지의 여부
for  com_virus in com_virus_list:
    start = []
    for idx in com_virus:
        start.append(virus_list[idx])
        
    time = bfs(start)
    if time != -2 and time != -1: # 백트래킹에 걸리지 않았으면서 전체 확산이 가능한 경우에만
        flag = 0
        min_v = min(min_v, time)

    if min_v == 0: # 최소 확산 시간이 0인 경우가 있으면 종료
        flag = 0
        break

# 출력
if flag:
    print(-1)
else:
    print(min_v)