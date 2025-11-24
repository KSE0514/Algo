import sys
from collections import deque
input = sys.stdin.readline

def find_start():
    for l in range(L):
        for r in range(R):
            for c in range(C):
                if arr[l][r][c] == 'S':
                    return (l, r, c)

def bfs(start):
    dq = deque()
    dq.append(start)
    visited = [[[-1] * C for _ in range(R)] for _ in range(L)]
    visited[start[0]][start[1]][start[2]] = 0

    d = [(0, 1, 0), (0, 0, 1), (1, 0, 0), (0, -1, 0), (0, 0, -1), (-1, 0, 0)]
    while dq:
        curL, curR, curC = dq.popleft()
        if arr[curL][curR][curC] == 'E':
            return f'Escaped in {visited[curL][curR][curC]} minute(s).'

        for l, r, c in d:
            newL = curL + l
            newR = curR + r
            newC = curC + c
            if 0 <= newL < L and 0 <= newR < R and 0 <= newC < C and arr[newL][newR][newC] != '#' and visited[newL][newR][newC] == -1:
                visited[newL][newR][newC] = visited[curL][curR][curC] + 1
                dq.append((newL, newR, newC))

    return 'Trapped!'

while True:
    L, R, C = map(int, input().split())
    if L == R == C == 0:
        break
    arr = [[list(input().strip()) for _ in range(R+1)] for _ in range(L)]
    start = find_start() # 시작점
    print(bfs(start))