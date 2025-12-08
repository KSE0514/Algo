import sys
from collections import deque
input = sys.stdin.readline

def bfs(st):
    dq = deque([st])
    visited[st] = 0

    while dq:
        cur = dq.popleft()
        for nxt in G[cur]:
            if visited[nxt] == -1:
                visited[nxt] = visited[cur] + 1
                dq.append(nxt)

N, M, R = map(int, input().split())
G = [[] for _ in range(N+1)]
visited = [-1] * (N+1)
for _ in range(M):
    u, v = map(int, input().split())
    G[u].append(v)
    G[v].append(u)

bfs(R)

for i in range(1, N+1):
    print(visited[i])