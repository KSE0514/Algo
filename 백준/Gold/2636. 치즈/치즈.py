import sys
from pprint import pprint as print
input = sys.stdin.readline

from collections import deque

def bfs():
    Q = deque()
    Q.append((0, 0))
    while Q:
        row, col = Q.popleft()
        visited[row][col] = True
        for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]: # 아래 위 오 왼
            newR = row + dr
            newC = col + dc
            if 0<= newR <N and 0<= newC <M and not visited[newR][newC]:
                # 범위를 벗어나지 않으면서 아직 방문을 안 했으면

                if arr[newR][newC] == 0: # 치즈 바깥쪽 공기일 경우
                    arr[newR][newC] = 2 # 값을 2로 바꿔주고
                    Q.append((newR, newC)) # 주변 탐색을 위해 큐에 담기

                elif arr[newR][newC] == 1: # 치즈일 경우
                    arr[newR][newC] = 2 # 값을 2로 바꿔주되, 좌표를 큐에 담진 않음(치즈의 테두리 부분만 녹으므로)

N, M = map(int, input().split())
arr = [list(map(int, input().split())) for _ in range(N)]

# 1시간만에 치즈가 다 녹아버리는 테스트 케이스를 위해 초기 치즈 수 카운트
cnt = 0
for r in range(N):
    cnt += arr[r].count(1)

time = 0
while True:
    visited = [[False]*M for _ in range(N)]

    time += 1 # 시간 +1
    bfs() # 치즈 바깥 공기 및 치즈의 테두리 부분의 값을 전부 2로 바꿔주는 작업
    
    # 2인 부분을 다시 0으로 바꿔주기
    for r in range(N):
        for c in range(M):
            if arr[r][c] == 2:
                arr[r][c] = 0

    cheese = 0
    for r in range(N):
        cheese += arr[r].count(1)

    if cheese == 0:# 치즈가 다 녹았다면 break. 이 때 arr에는 다 녹기 한 시간 전 남아있는 치즈 조각 정보가 담겨있음
        if time == 1: # 만약 1시간만에 녹았다면
            before_cheese = cnt # 초기 치즈조각의 개수 저장
        break
    before_cheese = cheese

print(time) # 치즈를 녹이는 데 걸리는 시간
print(before_cheese) # 치즈가 다 녹기 전 남아있는 치즈 양