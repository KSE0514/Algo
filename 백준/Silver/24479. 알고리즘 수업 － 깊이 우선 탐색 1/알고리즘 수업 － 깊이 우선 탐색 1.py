import sys
import heapq
sys.setrecursionlimit(10**5)
input = sys.stdin.readline

def dfs(cur):
    global num

    while G[cur]:
        nxt = heapq.heappop(G[cur])
        if visited[nxt] == 0:
            visited[nxt] = num
            num += 1
            dfs(nxt)


N, M, R = map(int, input().split())
G = [[] for _ in range(N+1)]
visited = [0] * (N+1)
for _ in range(M):
    u, v = map(int, input().split())
    heapq.heappush(G[u], v)
    heapq.heappush(G[v], u)

visited[R] = 1
num = 2
dfs(R)

for idx in range(1, N+1):
    print(visited[idx])