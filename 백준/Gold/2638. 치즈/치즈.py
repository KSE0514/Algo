import sys
input = sys.stdin.readline
# sys.stdin = open("2638input.txt", "r")
from collections import deque

def bfs():
    global cnt, N, M
    flag = 1
    while flag:
        cheeses = []
        while Q:
            curR, curC = Q.popleft()
            arr[curR][curC] = cnt
            for r, c in [(1, 0), (0, 1), (-1, 0), (0, -1)]: # 하우상좌
                newR = curR + r
                newC = curC + c
                if 0 <= newR < N and 0 <= newC < M and arr[newR][newC] != cnt:
                    # 범위 안에 있으면서 아직 방문 안 했으면
                    if arr[newR][newC] == 1:
                        # 만약 치즈라면
                        if (newR, newC) not in cheeses:
                            cheeses.append((newR, newC))
                    else:
                        arr[newR][newC] = cnt
                        Q.append((newR, newC))

        # 녹을 수 있는 치즈 찾기
        change = []
        for row, col in cheeses:
            check = 0
            for r, c in [(1, 0), (0, 1), (-1, 0), (0, -1)]: # 하우상좌
                nRow = row + r
                nCol = col + c
                if 0 <= nRow < N and 0 <= nCol < M and arr[nRow][nCol] == cnt:
                    check += 1
                if check == 2:
                    change.append((row,col))
                    break

        # 치즈 녹이기
        if change:
            for r, c in change:
                arr[r][c] = cnt
                Q.append((r, c))

        for r in range(N):
            if 1 in arr[r]:
                flag = 1
                cnt += 1
                break
            flag = 0


N, M = map(int, input().split())
arr = [list(map(int, input().split())) for _ in range(N)]

Q = deque()
check_flag = 0
for r in range(N):
    if 0 in arr[r]:
        c = arr[r].index(0)
        Q.append((r, c))
    if 1 in arr[r]:
        check_flag = 1

if Q and check_flag:
    cnt = 2
    bfs()
    print(cnt-1)

else:
    print(0)