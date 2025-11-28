import sys
from collections import deque
input = sys.stdin.readline

def bfs(start):
    dq = deque()
    dq.append(start)
    stone_visited[start] = 0

    while dq:
        cur = dq.popleft()
        if cur == M:
            return stone_visited[M]
        for nxt in [cur+1, cur-1, cur+A, cur-A, cur+B, cur-B, cur*A, cur*B]:
            if 0 <= nxt < MAX_SIZE and stone_visited[nxt] == -1:
                stone_visited[nxt] = stone_visited[cur] + 1
                dq.append(nxt)

A, B, N, M = map(int, input().split())
MAX_SIZE = 100001
stone_visited = [-1] * MAX_SIZE

if N == M:
    print(0)
else:
    print(bfs(N))