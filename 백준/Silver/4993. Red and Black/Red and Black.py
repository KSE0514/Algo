import sys
from collections import deque
input = sys.stdin.readline

def bfs(start):
    dq = deque()
    dq.append(start)
    visited = [[False] * W for _ in range(H)]
    visited[start[0]][start[1]] = True
    cnt = 1

    while dq:
        curR, curC = dq.popleft()
        for r, c in [(1, 0), (0, 1), (-1, 0), (0, -1)]:
            newR = curR + r
            newC = curC + c
            if 0 <= newR < H and 0 <= newC < W and arr[newR][newC] == "." and not visited[newR][newC]:
                cnt += 1
                visited[newR][newC] = True
                dq.append((newR, newC))

    return cnt

while True:
    W, H = map(int, input().split())
    if (W, H) == (0, 0):
        break
    arr = [list(input().strip()) for _ in range(H)]
    start = None
    for r in range(H):
        for c in range(W):
            if arr[r][c] == "@":
                start = (r, c)
                break
        if start:
            break

    print(bfs(start))