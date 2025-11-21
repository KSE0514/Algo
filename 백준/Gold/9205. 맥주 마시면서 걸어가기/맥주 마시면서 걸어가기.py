import sys
from collections import deque
input = sys.stdin.readline

def bfs(start):
    dq = deque()
    dq.append(start)
    end = (store[n][0], store[n][1])

    while dq:
        curR, curC = dq.popleft()
        if (curR, curC) == end:
            return "happy"
        for idx in range(n+1):
            nxtR, nxtC = store[idx]
            d = abs(nxtR - curR) + abs(nxtC - curC)
            if not visited[idx] and (d / 50) <= 20:
                visited[idx] = True
                dq.append((nxtR, nxtC))
    return "sad"

t = int(input())
for _ in range(t):
    n = int(input()) # 맥주를 파는 편의점 개수
    start = list(map(int, input().split()))
    store = [list(map(int, input().split())) for _ in range(n+1)]
    visited = [False] * (n+1)
    print(bfs(start))