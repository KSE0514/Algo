import sys
from collections import deque
input = sys.stdin.readline

def bfs(st_r, st_c):
    team = arr[st_r][st_c]
    dq = deque()
    dq.append((st_r, st_c))
    cnt = 1

    while dq:
        cur_r, cur_c = dq.popleft()
        for r, c in [(1, 0), (0, 1), (-1, 0), (0, -1)]:
            new_r = cur_r + r
            new_c = cur_c + c
            if 0 <= new_r < M and 0 <= new_c < N and arr[new_r][new_c] == team and not visited[new_r][new_c]:
                visited[new_r][new_c] = True
                cnt += 1
                dq.append((new_r, new_c))

    return cnt

N, M = map(int, input().split())
arr = [list(input().strip()) for _ in range(M)]
visited = [[False] * N for _ in range(M)]

b_cnt = 0
w_cnt = 0
for r in range(M):
    for c in range(N):
        if not visited[r][c]:
            visited[r][c] = True
            counting = bfs(r, c)
            if arr[r][c] == 'B':
                b_cnt += counting ** 2
            else:
                w_cnt += counting ** 2

print(w_cnt, b_cnt)