import sys
input = sys.stdin.readline
from collections import deque

def bfs(start):
    dq = deque()
    dq.append(start)
    visited[start] = 0
    result = []
    while dq:
        cur = dq.popleft()
        if visited[cur] == K:
            result.append(cur)
        if visited[cur] > K:
            break
        for nxt in G[cur]:
            if visited[nxt] == -1:
                visited[nxt] = visited[cur] + 1
                dq.append(nxt)
    return result

N, M, K, X = map(int, input().split())
G = [[] for _ in range(N + 1)]
visited = [-1] * (N+1)
for _ in range(M):
    A, B = map(int, input().split())
    G[A].append(B)


city_list = bfs(X)

if len(city_list):
    city_list.sort()
    for city in city_list:
        print(city)
else:
    print(-1)