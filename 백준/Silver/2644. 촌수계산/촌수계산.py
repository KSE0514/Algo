import sys
input = sys.stdin.readline
from collections import deque

def bfs(s):
    Q = deque([s])
    visited = [0] * (n+1)

    while Q:
        cur = Q.popleft()
        for next in G[cur]:
            if not visited[next] and next not in Q:
                Q.append(next)
                visited[next] = visited[cur] + 1

    if visited[end]:
        return visited[end]
    else:
        return -1

n = int(input()) # 사람 수
start, end = map(int, input().split()) # 촌수 계산 할 사람1, 2
m = int(input()) # 관계 개수

G = [[] for _ in range(n+1)]
for _ in range(m):
    x, y = map(int, input().split()) # 부모, 자식
    G[x].append(y)
    G[y].append(x)

print(bfs(start))