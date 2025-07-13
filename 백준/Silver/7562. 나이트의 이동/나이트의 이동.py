import sys
input = sys.stdin.readline
from collections import deque

def bfs(start):
    Q = deque()
    Q.append(start)
    while Q:
        curR, curC, cnt = Q.popleft()
        for r, c in [[-1, -2], [-2, -1], [-2, 1], [-1, 2], [1, 2], [2, 1], [1, -2], [2, -1]]:
            newR = curR + r
            newC = curC + c
            if 0 <= newR < I and 0 <= newC < I and not visited[newR][newC]:
                if (newR, newC) == (endR, endC):
                    return cnt + 1
                visited[newR][newC] = True
                Q.append((newR, newC, cnt + 1))


T = int(input())
for _ in range(T):
    I = int(input()) # 체스판 크기
    startR, startC = map(int, input().split()) # 시작점
    endR, endC = map(int, input().split()) # 목적지
    if (startR, startC) == (endR, endC):
        print(0)
    else:
        visited = [[False] * I for _ in range(I)]
        visited[startR][startC] = True
        print(bfs((startR, startC, 0)))