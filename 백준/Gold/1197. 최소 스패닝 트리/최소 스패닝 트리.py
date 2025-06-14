import sys
input = sys.stdin.readline
import heapq

def prim(start):
    hq = []
    heapq.heappush(hq, (0, start))
    while hq:
        weight, node = heapq.heappop(hq)
        if not visited[node]:
            edges.append(weight)
            visited[node] = True

            if len(edges) == V:
                return sum(edges)

            for nodeInfo in G[node]:
                if not visited[nodeInfo[1]]:
                    heapq.heappush(hq, nodeInfo)


V, E = map(int, input().split())
G = [[] for _ in range(V+1)]
visited = [False] * (V+1)
edges = []
for _ in range(E):
    A, B, C = map(int, input().split())
    G[A].append((C, B))
    G[B].append((C, A))

print(prim(1))