import sys
sys.setrecursionlimit(10**5)
input = sys.stdin.readline

def dfs(cur):
    for nxt in G[cur]:
        if visited[nxt] == -1:
            visited[nxt] = visited[cur] + 1
            dfs(nxt)


N, M, R = map(int, input().split())
G = [[] for _ in range(N+1)]
for _ in range(M):
    u, v = map(int, input().split())
    G[u].append(v)
    G[v].append(u)

for i in range(1, N+1):
    G[i].sort()

visited = [-1] * (N+1)
visited[R] = 0
dfs(R)
for i in visited[1:]:
    print(i)

