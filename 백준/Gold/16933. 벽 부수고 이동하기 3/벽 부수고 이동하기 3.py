import sys
input = sys.stdin.readline
from collections import deque

d = [1, 0, -1, 0]
def bfs():
    Q = deque()
    Q.append((0, 0, 0, 1, 1)) # 좌표(행), 좌표(열), 벽 부순 횟수, 낮/밤(낮: 1, 밤: 0), 거리
    visited[0][0][0] = 1
    while Q:
        curR, curC, broken, daytime, day = Q.popleft()
        if (curR, curC) == (N - 1, M - 1):
            return day
        
        for i in range(4):
            newR = curR + d[i]
            newC = curC + d[(i+1)%4]
            if 0 <= newR < N and 0 <= newC < M:
                # 벽일 경우
                if arr[newR][newC] and broken + 1 <= K and not visited[broken + 1][newR][newC]:
                    # 낮이라면 벽 부수기
                    if daytime:
                        visited[broken + 1][newR][newC] = day + 1
                        Q.append((newR, newC, broken+1, 0, day + 1))
                    else: # 밤이라면 기다리기(Q에 다시 추가해주기)
                        Q.append((curR, curC, broken, 1, day + 1))
                # 벽이 아닐 경우
                elif arr[newR][newC] == 0 and not visited[broken][newR][newC]:
                    visited[broken][newR][newC] = visited[broken][curR][curC] + 1
                    Q.append((newR, newC, broken, (daytime + 1)%2, day + 1))
    return -1

N, M, K = map(int, input().split()) # 행, 열, 부술 수 있는 벽 개수
arr = [list(map(int, input().strip())) for _ in range(N)]
visited = [[[0]*M for _ in range(N)] for _ in range(K+1)]

print(bfs())