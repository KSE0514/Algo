import sys
from collections import deque
input = sys.stdin.readline

SIZE = 5

def bfs(stR, stC):
    dq = deque()
    dq.append((stR, stC))
    visited = [[-1] * SIZE for _ in range(SIZE)]
    visited[stR][stC] = 0

    while dq:
        curR, curC = dq.popleft()

        if (curR, curC) == end:
            return visited[curR][curC]

        for r, c in [(1, 0), (0, 1), (-1, 0), (0, -1)]:
            newR = curR + r
            newC = curC + c
            if 0 <= newR < SIZE and 0 <= newC < SIZE and arr[newR][newC] != -1 and visited[newR][newC] == -1:
                visited[newR][newC] = visited[curR][curC] + 1
                dq.append((newR, newC))

    return -1

arr = [list(map(int, input().split())) for _ in range(SIZE)]
st_r, st_c = map(int, input().split())

end = None
for r in range(SIZE):
    for c in range(SIZE):
        if arr[r][c] == 1:
            end = (r, c)
            break
    if end:
        break

print(bfs(st_r, st_c))