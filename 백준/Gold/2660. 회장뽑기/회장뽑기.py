import sys
from collections import deque
input = sys.stdin.readline

def bfs(start):
    dq = deque([start])
    visited = [-1] * (N+1)
    visited[start] = 0
    while dq:
        cur = dq.popleft()
        for nxt in G[cur]:
            if visited[nxt] == -1:
                visited[nxt] = visited[cur] + 1
                dq.append(nxt)

    return max(visited[1:])

N = int(input()) # 회원 수
G = [[] for _ in range(N+1)]
while True:
    A, B = map(int, input().split()) # A와 B는 친구
    if (A, B) == (-1, -1):
        break
    G[A].append(B)
    G[B].append(A)

min_point = N # 가장 낮은 회원 점수
candidate = [] # 후보
for user in range(1, N+1):
    user_point = bfs(user)
    if user_point < min_point:
        min_point = user_point
        candidate = [user]
    elif user_point == min_point:
        candidate.append(user)

# 출력
print(min_point, len(candidate))
print(*candidate)