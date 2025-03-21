import sys
input = sys.stdin.readline
from collections import deque

def dfs(start):
    Q = deque([start])
    visited = [False] * (computer+1)
    cnt = 0

    while Q: # 더이상 방문할 게 없을 때까지 반복
        cur = Q.popleft()
        visited[cur] = True

        for next in G[cur]:
            if not visited[next] and next not in Q:
                Q.append(next)
                cnt += 1
    return cnt


computer = int(input()) # 컴퓨터 수
netSet = int(input()) # 네트워크 쌍의 수

G = [[] for _ in range(computer + 1)]

# 네트워크 연결구조 채우기
for _ in range(netSet):
    v1, v2 = map(int, input().split())
    G[v1].append(v2)
    G[v2].append(v1)

print(dfs(1))