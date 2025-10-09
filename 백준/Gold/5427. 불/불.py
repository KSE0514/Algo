import sys
from collections import deque
input = sys.stdin.readline

def bfs(start_list, stR, stC):
    dq = deque(start_list)
    dq.append((0, stR, stC))
    visited = [[0] * w for _ in range(h)]
    visited[stR][stC] = 1

    while dq:
        is_fire, curR, curC = dq.popleft()
        if is_fire:
            for r, c in [(1, 0), (0, 1), (-1, 0), (0, -1)]:
                newR = curR + r
                newC = curC + c
                if 0 <= newR < h and 0 <= newC < w and (arr[newR][newC] == '.' or arr[newR][newC] == '@'):
                    arr[newR][newC] = '*'
                    dq.append((1, newR, newC))
        else:
            if curR == 0 or curC == 0 or curR == h - 1 or curC == w - 1:
                return visited[curR][curC]
            for r, c in [(1, 0), (0, 1), (-1, 0), (0, -1)]:
                newR = curR + r
                newC = curC + c
                if 0 <= newR < h and 0 <= newC < w and arr[newR][newC] == '.' and not visited[newR][newC]:
                    visited[newR][newC] = visited[curR][curC] + 1
                    dq.append((0, newR, newC))
    return "IMPOSSIBLE"

T = int(input())

for _ in range(T):
    w, h = map(int, input().split()) # 열, 행
    arr = [list(input()) for _ in range(h)]
    stR = -1
    stC = -1
    fire_list = []
    for r in range(h):
        for c in range(w):
            if arr[r][c] == '*':
                fire_list.append((1, r, c))
            elif arr[r][c] == '@':
                stR = r
                stC = c

    print(bfs(fire_list, stR, stC))