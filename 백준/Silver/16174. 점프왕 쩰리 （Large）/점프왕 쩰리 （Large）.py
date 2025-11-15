import sys
from collections import deque
input = sys.stdin.readline

def bfs(st_r, st_c):
    dq = deque([(st_r, st_c)])
    visited[st_r][st_c] = True
    while dq:
        cur_r, cur_c = dq.popleft()
        if (cur_r, cur_c) == (N-1, N-1):
            return "HaruHaru"
        for r, c in [(1, 0), (0, 1)]:
            jump = arr[cur_r][cur_c]
            new_r = cur_r + jump * r
            new_c = cur_c + jump * c
            if 0 <= new_r < N and 0 <= new_c < N and not visited[new_r][new_c]:
                visited[new_r][new_c] = True
                dq.append((new_r, new_c))

    return "Hing"

N = int(input())
arr = [list(map(int, input().split())) for _ in range(N)]
visited = [[False] * N for _ in range(N)]

print(bfs(0, 0))