import sys
from collections import deque
input = sys.stdin.readline

def bfs(start):
    dq = deque([start])
    visited[start] = True
    cnt = 1
    while dq:
        cur = dq.popleft()
        for i in [1, -1]:
            nxt = cur + bridge[cur] * i
            if 0 < nxt <= n and not visited[nxt]:
                cnt += 1
                visited[nxt] = True
                dq.append(nxt)
    return cnt

n = int(input())
bridge = [0] + list(map(int, input().split()))
visited = [False] * (n+1)
visited[0] = True
s = int(input())

print(bfs(s))