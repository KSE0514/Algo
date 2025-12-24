import sys
from collections import deque
input = sys.stdin.readline

def bfs(st_r, st_c):
    dq = deque()
    dq.append((st_r, st_c))
    arr[st_r][st_c] = 0

    while dq:
        curR, curC = dq.popleft()
        if (curR, curC) == (M-1, N-1):
            return "Yes"

        for r, c in [(1, 0), (0, 1)]:
            newR = curR + r
            newC = curC + c
            if 0 <= newR < M and 0 <= newC < N and arr[newR][newC]:
                arr[newR][newC] = 0
                dq.append((newR, newC))

    return "No"

N, M = map(int, input().split())
arr = [list(map(int, input().split())) for _ in range(M)]

print(bfs(0, 0))