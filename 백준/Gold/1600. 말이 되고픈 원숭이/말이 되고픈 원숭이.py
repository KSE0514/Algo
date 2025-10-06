import sys
from collections import deque
input = sys.stdin.readline

def bfs(stR, stC):
    dq = deque()
    dq.append((stR, stC, 0))
    visited[0][stR][stC] = 1

    while dq:
        curR, curC, curH = dq.popleft()
        if (curR, curC) == (H-1, W-1):
            return visited[curH][curR][curC] - 1

        # 말 처럼 이동할 수 있다면(높이 + 1)
        if curH < K:
            for hr, hc in [(-1, -2), (-2, -1), (-2, 1), (-1, 2), (1, 2), (2, 1), (2, -1), (1, -2)]:
                hnewR = curR + hr
                hnewC = curC + hc
                newH = curH + 1
                if 0 <= hnewR < H and 0 <= hnewC < W and not arr[hnewR][hnewC] and not visited[newH][hnewR][hnewC]:
                    visited[newH][hnewR][hnewC] = visited[curH][curR][curC] + 1
                    dq.append((hnewR, hnewC, newH))

        # 상하좌우 이동(높이 그대로)
        for r, c in [(1, 0), (0, 1), (-1, 0), (0, -1)]:
            newR = curR + r
            newC = curC + c
            if 0 <= newR < H and 0 <= newC < W and not arr[newR][newC] and not visited[curH][newR][newC]:
                visited[curH][newR][newC] = visited[curH][curR][curC] + 1
                dq.append((newR, newC, curH))
        
    return -1


K = int(input())
W, H = map(int, input().split())
arr = [list(map(int, input().split())) for _ in range(H)]
visited = [[[0] * W for _ in range(H)] for _ in range(K + 1)]

print(bfs(0, 0))