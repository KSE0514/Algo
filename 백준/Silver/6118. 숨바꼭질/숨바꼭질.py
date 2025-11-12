import sys
from collections import deque
input = sys.stdin.readline

def bfs(start):
    visited = [-1] * (N+1)
    visited[start] = 0
    dq = deque([start])
    min_shed =  N+1
    shed_cnt = 0
    max_len = 0

    while dq:
        cur = dq.popleft()
        for nxt in G[cur]:
            if visited[nxt] == -1:
                visited[nxt] = visited[cur] + 1
                if max_len < visited[nxt]:
                    max_len = visited[nxt]
                    shed_cnt = 1
                    min_shed = nxt
                elif max_len == visited[nxt]:
                    shed_cnt += 1
                    min_shed = min(min_shed, nxt)
                dq.append(nxt)

    return min_shed, max_len, shed_cnt



N, M = map(int, input().split())
G = [[] for _ in range(N+1)]
for _ in range(M):
    A, B = map(int, input().split())
    G[A].append(B)
    G[B].append(A)

print(*bfs(1))