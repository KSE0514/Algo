import sys
input = sys.stdin.readline
from collections import deque

d = [1, 0, -1, 0]
def bfs(stD, stR, stC):
    global sum_time, shark_p, shark_s, eat_cnt
    Q = deque()
    Q.append((stD, stR, stC))
    visited = [[False] * N for _ in range(N)]
    visited[stR][stC] = True
    fish_list = [] # 먹을 수 있는 물고기 리스트
    while Q:
        curD, curR, curC = Q.popleft()
        for i in range(4):
            newR = curR + d[i]
            newC = curC + d[(i+1)%4]
            if 0 <= newR < N and 0 <= newC < N and not visited[newR][newC] and arr[newR][newC] <= shark_s:
                # 먹을 수 있는 물고기라면 fish_list에 추가
                if 0 < arr[newR][newC] < shark_s:
                    fish_list.append((curD + 1, newR, newC))

                visited[newR][newC] = True
                Q.append((curD+1, newR, newC))
                
    len_of_fish_list = len(fish_list)
    # 먹을 수 있는 물고기가 있다면 먹고, 없다면 종료
    if len_of_fish_list:
        if len_of_fish_list > 1:
            fish_list = sorted(fish_list, key = lambda x : (x[0], x[1], x[2])) # 거리, 행, 열 오름차순(거리가 가깝다면 가장 위에있으면서 가장 왼쪽에 있는 것을 먹기 때문)
        sum_time += fish_list[0][0]
        shark_p = (fish_list[0][1], fish_list[0][2])
        arr[fish_list[0][1]][fish_list[0][2]] = 0 # arr에서 먹은 물고기 자리를 0으로 바꿔주기
        eat_cnt += 1 # 먹은 물고기 개수 증가
        # 먹은 물고기 개수의 합이 상어의 사이즈와 같으면 상어 사이즈 증가 & 먹은 물고기 개수 리셋
        if shark_s == eat_cnt:
            shark_s += 1
            eat_cnt = 0
        return 1
    else:
        return 0

N = int(input()) # 공간 크기
arr = [list(map(int, input().split())) for _ in range(N)]

shark_p = (0, 0) # 상어의 초기 좌표
shark_s = 2 # 상어의 초기 사이즈
sum_time = 0 # 상어가 물고기를 잡아먹을 수 있는 시간
# 상어의 처음 위치 구하기
for r in range(N):
    if 9 in arr[r]:
        c = arr[r].index(9)
        shark_p = (r, c)
eat_cnt = 0 # 상어가 먹은 물고기 수(상어가 자랄 때마다 리셋)
arr[shark_p[0]][shark_p[1]] = 0

flag = 1
while flag:
    flag = bfs(0, shark_p[0], shark_p[1])

print(sum_time)