import sys
input = sys.stdin.readline
import heapq

def prim(st):
    global Inf
    while True:
        heap = G[st]
        visited[st] = True
        while heap:
            cost, nxt = heapq.heappop(heap)
            if not visited[nxt]:
                min_cost[nxt] = min(min_cost[nxt], min_cost[st] + cost)

        minV = Inf
        nxt_st = st
        for idx in range(1, V+1):
            if not visited[idx]:
                if min_cost[idx] < minV:
                    minV = min_cost[idx]
                    nxt_st = idx
        if nxt_st == st:
            break
        else:
            st = nxt_st


V, E = map(int, input().split())
start = int(input())
G = [[] for _ in range(V+1)]
visited = [False] * (V+1)
Inf = int(1e6)
min_cost = [Inf] * (V+1)
for _ in range(E):
    u, v, w = map(int, input().split())
    heapq.heappush(G[u], (w, v))

min_cost[start] = 0
prim(start)
for idx in range(1, V+1):
    if min_cost[idx] == Inf:
        print('INF')
    else:
        print(min_cost[idx])