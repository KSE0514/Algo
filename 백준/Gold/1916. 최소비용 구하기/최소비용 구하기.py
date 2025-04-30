import sys
input = sys.stdin.readline
import math
from collections import deque

def dijk(st):
    global end, N
    Q = deque(G[st])
    visited[st] = True

    if st == end:
        return
    else:
        while Q:
            nxt, bus_cost = Q.popleft()
            if not visited[nxt]:
                min_cost[nxt] = min(min_cost[nxt], min_cost[st] + bus_cost)

        minV = math.inf
        nxt_st = st
        for idx in range(1, N + 1):
            if not visited[idx]:
                if min_cost[idx] < minV:
                    minV = min_cost[idx]
                    nxt_st = idx

        dijk(nxt_st)



N = int(input())
M = int(input())
Inf = math.inf
min_cost = [Inf]*(N+1)
visited = [False] * (N+1)
G = [[] for _ in range(N+1)]
for _ in range(M):
    st, ed, cost = map(int, input().split())
    G[st].append((ed, cost))

# 비용이 낮은 순대로 정렬
for idx in range(1, N + 1):
    G[idx] = sorted(G[idx], key = lambda x : x[1])

start, end = map(int, input().split())
min_cost[start] = 0
dijk(start)
print(min_cost[end])