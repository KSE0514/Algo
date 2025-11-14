import sys
from collections import deque
input = sys.stdin.readline

def bfs(start, end):
    dq = deque([start])
    visited[start] = 0

    while dq:
        cur = dq.popleft()
        if cur == end:
            return visited[cur]

        jump = bridge[cur]
        for j in range(jump, N+1, jump):
            for c in [1, -1]:
                nxt = cur + j * c
                if 0 < nxt <= N and visited[nxt] == -1:
                    visited[nxt] = visited[cur] + 1
                    dq.append(nxt)
    return -1





N = int(input())
bridge = [0] + list(map(int, input().split()))
visited = [-1] * (N+1)
a, b = map(int, input().split())

print(bfs(a, b))