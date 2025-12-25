import sys
from collections import deque
input = sys.stdin.readline

def bfs(st):
    dq = deque()
    dq.append(st)
    visited[st] = 0

    while dq:
        cur = dq.popleft()

        if cur == K:
            return visited[cur]

        for i in [1, cur]:
            nxt = cur + i
            if 1 <= nxt <= K and visited[nxt] == -1:
                visited[nxt] = visited[cur] + 1
                dq.append(nxt)

A, K = map(int, input().split())
visited = [-1] * (K+1)

print(bfs(A))