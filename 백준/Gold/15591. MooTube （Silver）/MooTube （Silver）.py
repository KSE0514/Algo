import sys
input = sys.stdin.readline
from collections import deque

N, Q = map(int, input().split())
G = [[] for _ in range(N+1)]


for _ in range(N-1):
    p, q, r = map(int, input().split())
    G[p].append((q, r))
    G[q].append((p, r))

for _ in range(Q):
    k, v = map(int, input().split())
    cnt = 0
    deq = deque()
    deq.append((v, 10**9))
    visited = [10**9]*(N+1)

    while deq:
        ver, r = deq.popleft()
        for item in G[ver]: # 인접한 점들에 대하여
            nxt, usado = item # 인접한 점, 현재 점(ver)과 인접한 점(nxt)과의 유사도(usado)
            if nxt != v and visited[nxt] == 10**9: # 아직 방문을 안 했다면
                visited[nxt] = min(r, usado)
                deq.append((nxt, visited[nxt]))
                if visited[nxt] >= k:
                    cnt += 1

    print(cnt)