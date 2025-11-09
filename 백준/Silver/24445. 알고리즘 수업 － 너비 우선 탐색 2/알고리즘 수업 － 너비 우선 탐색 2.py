import sys
from collections import deque
input = sys.stdin.readline

def bfs(st):
    visited = [0] * (N+1)
    visited[st] = 1
    num = 2
    dq = deque()
    dq.append(st)

    while dq:
        cur = dq.popleft()
        for nxt in G[cur]:
            if visited[nxt] == 0:
                visited[nxt] = num
                num += 1
                dq.append(nxt)
    return visited[1:]

N, M, R = map(int, input().split())
G = [[] for _ in range(N+1)]
for _ in range(M):
    u, v = map(int, input().split())
    G[u].append(v)
    G[v].append(u)

for i in range(1, N+1):
    G[i].sort(reverse=True)

result = bfs(R)
for n in result:
    print(n)