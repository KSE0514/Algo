import sys
input = sys.stdin.readline
from collections import deque

def bfs(s): # 인접한 곳의 값을 전부 0으로 만들기
    Q = deque()
    Q.append(s)
    while Q:
        row, col = Q.popleft()
        if arr[row][col]: # 아직 방문을 안 했다면
            arr[row][col] = 0
            for dr, dc in [(1, 0), (0, 1), (-1, 0), (0, -1)]: # 아래 오룬 위 왼
                newR = row + dr
                newC = col + dc
                if 0<= newR < N and 0<= newC < M and arr[newR][newC]: # 범위에 벗어나 있지 않으며, 배추가 있으면
                    Q.append((newR, newC))

T = int(input()) # 테스트 케이스

for _ in range(T):
    M, N, K = map(int, input().split()) # 열(가로) 행(세로) 배추 개수
    arr = [[0]*M for _ in range(N)]
    # print(arr)
    for _ in range(K):
        X, Y = map(int, input().split())
        arr[Y][X] = 1
    # print(arr)

    cnt = 0 # 필요한 지렁이의 수 카운트

    for r in range(N):
        for c in range(M):
            if arr[r][c] == 1:
                cnt += 1
                bfs((r, c))

    print(cnt)