import sys
from collections import deque
input = sys.stdin.readline

def bfs(start):
    dq = deque()
    dq.append(start)
    visited[start] = True

    while dq:
        cur = dq.popleft()
        if cur == N:
            return "YES"

        for i in [1, K]:
            nxt = cur + i
            if 1 <= nxt <= N and arr[nxt] != '#' and not visited[nxt]:
                visited[nxt] = True
                dq.append(nxt)
    return "NO"

N, K = map(int, input().split())
arr = ['_'] + list(input().strip())
visited = [False] * (N+1)

print(bfs(1))