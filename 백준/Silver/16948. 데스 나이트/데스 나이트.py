import sys
from collections import deque
input = sys.stdin.readline

def bfs(stR, stC):
    dq = deque()
    dq.append((stR, stC))
    visited[stR][stC] = 1

    while dq:
        curR, curC = dq.popleft()

        if (curR, curC) == (r2, c2):
            return visited[curR][curC] - 1
        for r, c in [(-2, -1), (-2, 1), (0, -2), (0, 2), (2, -1), (2, 1)]:
            newR = curR + r
            newC = curC + c
            if 0 <= newR < N and 0 <= newC < N and not visited[newR][newC]:
                visited[newR][newC] = visited[curR][curC] + 1
                dq.append((newR, newC))

    return -1

N = int(input())
r1, c1, r2, c2 = map(int, input().split())
visited = [[0] * N for _ in range(N)]

if (r1, c1) == (r2, c2):
    print(0)
else:
    print(bfs(r1, c1))