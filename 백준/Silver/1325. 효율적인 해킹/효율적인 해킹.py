import sys
from collections import deque
input = sys.stdin.readline

def bfs(n):
    dq = deque()
    dq.append(n)
    cnt = 1
    visited = [False] * (N+1)
    visited[n] = True
    while dq:
        cur = dq.popleft()
        for nxt in G[cur]:
            if not visited[nxt]:
                cnt += 1
                visited[nxt] = True
                dq.append(nxt)

    return cnt


N, M = map(int, input().split())
G = [[] for _ in range(N+1)]

for _ in range(M):
    A, B = map(int, input().split()) # A가 B를 신뢰
    G[B].append(A)

result = []
max_cnt = 0
for i in range(1, N+1):
    com_cnt = bfs(i)
    if com_cnt > max_cnt:
        result = [i]
        max_cnt = com_cnt
    elif com_cnt == max_cnt:
        result.append(i)

print(*result)