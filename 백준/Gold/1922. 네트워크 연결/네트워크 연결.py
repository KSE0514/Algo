import sys
input = sys.stdin.readline
import heapq

def prim(start):
    global N
    hq = []
    heapq.heappush(hq, (0, start))
    while hq:
        weight, com_num = heapq.heappop(hq)
        if not visited[com_num]:
            visited[com_num] = True
            edges.append(weight)

            if len(edges) == N:
                return sum(edges)
            for com_info in G[com_num]:
                heapq.heappush(hq, com_info)

N = int(input())
M = int(input())
G = [[] for _ in range(N+1)]
visited = [False] * (N+1)
edges = []
for _ in range(M):
    a, b, c = map(int, input().split()) # 컴퓨터1, 컴퓨터2, 비용
    if a != b:
        G[a].append((c, b))
        G[b].append((c, a))
print(prim(1))