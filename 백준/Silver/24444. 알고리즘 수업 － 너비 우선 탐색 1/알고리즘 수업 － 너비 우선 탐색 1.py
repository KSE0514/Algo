import sys
from collections import deque
input = sys.stdin.readline

N, M, R = map(int, input().split()) # 정점 수, 간선 수, 시작 정점
visited = [0] * (N+1)
G = [[] for _ in range(N+1)]
for _ in range(M):
    u, v = map(int, input().split())
    G[u].append(v)
    G[v].append(u)

dq = deque()
dq.append(R)
v_num = 1
visited[R] = v_num
v_num += 1
while dq:
    cur = dq.popleft()
    G[cur].sort()
    for nxt in G[cur]:
        if not visited[nxt]:
            visited[nxt] = v_num
            v_num += 1
            dq.append(nxt)

for i in visited[1:]:
    print(i)