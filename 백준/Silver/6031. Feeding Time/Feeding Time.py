import sys
from collections import deque
input = sys.stdin.readline

def bfs(stR, stC):
    dq = deque()
    dq.append((stR, stC))
    cnt = 1

    while dq:
        curR, curC = dq.popleft()
        for r, c in [(1, 0), (0, 1), (-1, 0), (0, -1), (1, 1), (1, -1), (-1, 1), (-1, -1)]:
            newR = curR + r
            newC = curC + c
            if 0 <= newR < H and 0 <= newC < W and arr[newR][newC] == '.' and not visited[newR][newC]:
                cnt += 1
                visited[newR][newC] = True
                dq.append((newR, newC))

    return cnt

W, H = map(int, input().split())
arr = [list(input().strip()) for _ in range(H)]
visited = [[False] * W for _ in range(H)]

maxV = 0
for r in range(H):
    for c in range(W):
        if arr[r][c] == '.' and not visited[r][c]:
            visited[r][c] = True
            maxV = max(maxV, bfs(r, c))

print(maxV)