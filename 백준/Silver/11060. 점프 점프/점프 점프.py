import sys
from collections import deque
input = sys.stdin.readline


def bfs(n):
    dq = deque()
    dq.append(n)
    visited = [False] * N
    min_jump = [0] * N
    visited[0] = True
    min_jump[0] = 0
    while dq:
        cur_idx = dq.popleft()
        if cur_idx == N - 1:
            return min_jump[cur_idx]
        for i in range(1, num_list[cur_idx] + 1):
            nxt_idx = cur_idx + i
            if nxt_idx < N and not visited[nxt_idx]:
                visited[nxt_idx] = True
                min_jump[nxt_idx] = min_jump[cur_idx] + 1
                dq.append(nxt_idx)
    return -1

N = int(input())
num_list = list(map(int, input().split()))

print(bfs(0))