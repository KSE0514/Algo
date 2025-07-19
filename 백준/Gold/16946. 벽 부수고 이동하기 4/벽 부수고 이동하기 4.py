import sys
input = sys.stdin.readline
from collections import deque

dx = [1, 0, -1, 0]
dy = [0, 1, 0, -1]

# 빈칸인 곳 면적(칸 수) 확인해서 해당 구역 key(area_key)의 값으로 넣기
def bfs(start):
    Q = deque()
    cnt = 1
    Q.append(start)
    while Q:
        curR, curC = Q.popleft()
        for i in range(4):
            newR = curR + dx[i]
            newC = curC + dy[i]
            if 0 <= newR < N and 0 <= newC < M and arr[newR][newC] == 0 and area_state[newR][newC] == 0:
                area_state[newR][newC] = area_key
                cnt += 1
                Q.append((newR, newC))

    area_dic[area_key] = cnt


N, M = map(int, input().split())
arr = [list(map(int, input().strip())) for _ in range(N)]
area_state = [[0] * M for _ in range(N)] # 빈 구역 상태를 나타내는 2차원 배열
area_dic = {} # 각 구역들의 칸 수를 저장
area_key = -1 # 각 빈칸 구역들을 구분하는 고윳값(음수로 구분)

# 빈 구역 파악
for row in range(N):
    for col in range(M):
        if arr[row][col] == 0 and area_state[row][col] == 0:
            area_state[row][col] = area_key # area_state에서 같은 area_key값을 갖는다면 같은 구역임
            bfs((row, col))
            area_key -= 1

# (r, c)좌표의 벽을 부쉈을 때 이동할 수 있는 칸들 카운트
for r in range(N):
    for c in range(M):
        if arr[r][c] == 1:
            around_area = set() # 상하좌우 구역의 종류 담기
            for i in range(4):
                if 0 <= r + dx[i] < N and 0 <= c + dy[i] < M and area_state[r+dx[i]][c+dy[i]] != 0:
                    around_area.add(area_state[r + dx[i]][c + dy[i]])
            # 구역 별 칸 수 누적해주기
            for a_key in list(around_area):
                arr[r][c] += area_dic[a_key]
            # 이동할 수 있는 칸의 개수 10으로 나누기
            arr[r][c] %= 10
# 출력
for r in range(N):
    print(''.join(map(str, arr[r])))
