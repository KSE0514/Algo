import sys
from collections import deque
input = sys.stdin.readline

def bfs(st, ed):
    dq = deque()
    dq.append(st)
    visited = [-1] * (N+1)
    visited[st] = 0

    while dq:
        cur = dq.popleft()
        if cur == ed:
            return visited[cur]
        
        for nxt, nxt_len in G[cur]:
            if visited[nxt] == -1:
                visited[nxt] = visited[cur] + nxt_len
                dq.append(nxt)

N, Q = map(int, input().split())
G = [[] for _ in range(N+1)]
for _ in range(N-1):
    A, B, L = map(int, input().split())
    G[A].append((B, L))
    G[B].append((A, L))

for _ in range(Q):
    st, ed = map(int, input().split())
    print(bfs(st, ed))