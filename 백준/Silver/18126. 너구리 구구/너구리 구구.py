import sys
from collections import deque
input = sys.stdin.readline

def bfs(start):
    dq = deque([start])
    visited[start] = 0
    while dq:
        cur = dq.popleft()
        for nxt, nxt_d in G[cur]:
            if visited[nxt] == -1:
                visited[nxt] = visited[cur] + nxt_d
                dq.append(nxt)
    return max(visited)

N = int(input())
visited = [-1] * (N+1)
G = [[] for _ in range(N+1)]
for _ in range(N-1):
    A, B, C = map(int, input().split()) # A와 B 사이의 거리 C
    G[A].append((B, C))
    G[B].append((A, C))

print(bfs(1))