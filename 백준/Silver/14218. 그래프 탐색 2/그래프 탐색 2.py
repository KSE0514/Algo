import sys
from collections import deque
input = sys.stdin.readline

def bfs(st):
    dq = deque()
    dq.append(st)

    while dq:
        cur = dq.popleft()
        for nxt in G[cur]:
            if visited[nxt] == -1:
                visited[nxt] = visited[cur] + 1
                dq.append(nxt)
            elif visited[nxt] >= visited[cur] + 1:
                visited[nxt] = visited[cur] + 1
                dq.append(nxt)

n, m = map(int, input().split())
G = [[] for _ in range(n+1)]
for _ in range(m):
    n1, n2 = map(int, input().split())
    G[n1].append(n2)
    G[n2].append(n1)

q = int(input()) # 정비 계획에 들어있는 도로의 수
visited = [-1] * (n+1)
visited[1] = 0

for _ in range(q):
    i, j = map(int, input().split())
    G[i].append(j)
    G[j].append(i)
    bfs(1)
    print(*visited[1:])
