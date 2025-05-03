import sys
input = sys.stdin.readline
sys.setrecursionlimit(10**5)
from collections import deque


def tree(root):
    Q = deque()
    for node in G[root]:
        if not visited[node]:
            parent[node] = root
            visited[node] = True
            Q.append(node)

    while Q:
        child = Q.popleft()
        tree(child)



N = int(input())
G = [[] for _ in range(N+1)]
visited = [False] * (N+1)
parent = [0] * (N+1)
for _ in range(N-1):
    n1, n2 = map(int, input().split())
    G[n1].append(n2)
    G[n2].append(n1)

visited[1] = True
tree(1)

for i in range(2, N+1):
    print(parent[i])