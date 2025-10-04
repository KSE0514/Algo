import sys
from collections import deque
input = sys.stdin.readline

def bfs(st):
    dq = deque()
    dq.append(st)
    visited = [1e6] * 101
    visited[st] = 1
    while dq:
        cur = dq.popleft()
        if cur == 100:
            return visited[100] - 1

        for i in range(1, 7):
            nxt = cur + i
            if 1 <= nxt < 101 and visited[nxt] == 1e6:
                visited[nxt] = visited[cur] + 1
                if nxt in snake_dic or nxt in ladder_dic:
                    if nxt in snake_dic:
                        nxt = snake_dic[nxt]
                    elif nxt in ladder_dic:
                        nxt = ladder_dic[nxt]
                    if visited[nxt] == 1e6:
                        visited[nxt] = visited[cur] + 1
                dq.append(nxt)


N, M = map(int, input().split())
ladder_dic = {}
for _ in range(N):
    x, y = map(int, input().split())
    ladder_dic[x] = y

snake_dic = {}
for _ in range(M):
    u, v = map(int, input().split())
    snake_dic[u] = v

arr = [0] * 101
print(bfs(1))