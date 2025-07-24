import sys
input = sys.stdin.readline
from collections import deque

N, L, R = map(int, input().split())
arr = [list(map(int, input().split())) for _ in range(N)]

dx = [1, 0, -1, 0]
dy = [0, 1, 0, -1]

def bfs(start):
    Q = deque()
    Q.append(start)
    visited[start[0]][start[1]] = True
    sum_people = arr[start[0]][start[1]]
    cnt_nation = 1
    united = [start]
    while Q:
        curR, curC = Q.popleft()

        for i in range(4):
            newR = curR + dx[i]
            newC = curC + dy[i]
            if 0 <= newR < N and 0 <= newC < N and not visited[newR][newC] and L <= abs(arr[curR][curC] - arr[newR][newC]) <= R:
                visited[newR][newC] = True
                sum_people += arr[newR][newC]
                cnt_nation += 1
                Q.append((newR, newC))
                united.append((newR, newC))
    if cnt_nation > 1:
        movement_result = sum_people // cnt_nation
        for r, c in united:
            arr[r][c] = movement_result

day = 0
while day <= 2000:
    flag = 0 # 해당 회차에 인구 이동이 한 번 이상 일어났는지(그 다음 회차도 인구 이동을 확인할 필요가 있는지)를 알려주는 플래그
    visited = [[False] * N for _ in range(N)]
    for row in range(N):
        for col in range(N):
            flag2 = 0  # 해당 회차에서 현 좌표(row, col)에 대하여 bfs를 돌았는지
            for i in range(4): # (row, col) 근방을 탐색하며 bfs를 돌아야 하는지 판단
                if flag2: # (row, col)에 대하여 bfs를 돈 적이 있다면
                    break
                nRow = row + dx[i]
                nCol = col + dy[i]
                if 0 <= nRow < N and 0 <= nCol < N and L <= abs(arr[nRow][nCol] - arr[row][col]) <= R and not visited[row][col] and not visited[nRow][nCol]:
                    visited[row][col] = True
                    flag2 = 1
                    flag = 1
                    bfs((row, col))
    # 현 회차에서 인구 이동이 한 번이라도 일어났으면 day + 1
    if flag:
        day += 1
    # 현 회차에서 인구 이동이 한 번도 안 일어났으면 그 다음 회차부턴 볼 필요 없음
    else:
        break


print(day)