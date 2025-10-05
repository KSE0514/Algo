import sys
from collections import deque
input = sys.stdin.readline

N, M = map(int, input().split())
arr = [list(map(int, input().split())) for _ in range(N)]

# 빈 칸 정보 및 바이러스 위치 저장
empty_space = []
virus_list = []
for r in range(N):
    for c in range(M):
        if arr[r][c] == 0:
            empty_space.append((r, c))
        elif arr[r][c] == 2:
            virus_list.append((r, c))

com_result = [] # 벽을 설치할 빈 공간의 (empty_space에서의)인덱스 조합을 저장할 배열
ST = []
empty_cnt = len(empty_space)
def com(d, st_idx):
    if d == 3:
        com_result.append([*ST])
        return
    for idx in range(st_idx, empty_cnt):
        ST.append(idx)
        com(d+1, idx+1)
        ST.pop()

com(0, 0)

def bfs(virus_l):
    dq = deque(virus_l)
    visited = [[False] * M for _ in range(N)]
    infected_cnt = 0 # 감염되는 공간 수 카운트
    for virus in virus_l:
        visited[virus[0]][virus[1]] = True
        
    while dq:
        if infected_cnt > min_infected: # 백트래킹
            infected_cnt = -1
            break

        curR, curC = dq.popleft()
        for r, c in [(1, 0), (0, 1), (-1, 0), (0, -1)]:
            newR = curR + r
            newC = curC + c
            if 0 <= newR < N and 0 <= newC < M and not visited[newR][newC] and arr[newR][newC] == 0:
                infected_cnt += 1
                visited[newR][newC] = True
                dq.append((newR, newC))

    return infected_cnt


min_infected = empty_cnt - 3
for idx_list in com_result:
    # 벽 설치하기
    for idx in idx_list:
        arr[empty_space[idx][0]][empty_space[idx][1]] = 1

    # 벽을 설치했을 때 감염되는 공간 수를 파악하고, min_infected에 가장 적게 감염되는 공간 수를 저장
    infected_cnt = bfs(virus_list)
    if infected_cnt != -1 and min_infected > infected_cnt:
        min_infected = infected_cnt
        if min_infected == 0: # 감염이 안 되는 경우가 있으면 바로 종료
            break

    # 설치했던 벽 다시 치우기
    for idx in idx_list:
        arr[empty_space[idx][0]][empty_space[idx][1]] = 0

# 출력
print(empty_cnt - 3 - min_infected) # 안전영역 최대 크기 = 빈 공간 - 새로 지은 벽(3) - 최소 감염 칸 수