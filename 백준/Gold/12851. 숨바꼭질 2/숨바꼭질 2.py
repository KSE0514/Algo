import sys
input = sys.stdin.readline
from collections import deque

def bfs(start):
    global K, min_cnt, min_case
    Q = deque(start)
    flag = 0 # 가장 빠른 시간 경우의 수 다 세면 중단하는 용
    while Q:
        # print(Q)
        # print(visited)
        X, cnt = Q.popleft()
        if flag and cnt > min_cnt:
            return
        if X == K:
            if cnt <= min_cnt:
                min_cnt = cnt
                min_case += 1
                flag = 1
            # elif cnt == min_cnt:
            #     min_case += 1
        else:
            if visited[X] == 0 or cnt <= visited[X]:
                if visited[X] == 0:
                    visited[X] = cnt
                if X > K:
                    if 0 <= X-1 <= 100000 and (visited[X-1] == 0 or cnt+1 <= visited[X-1]):
                        Q.append((X-1, cnt + 1))
                else:
                    if 0 <= 2*X <= 100000 and (visited[2*X] == 0 or cnt+1 <= visited[2*X]):
                        Q.append((2*X, cnt + 1))
                    if 0 <= X+1 <= 100000 and (visited[X+1] == 0 or cnt+1 <= visited[X+1]):
                        Q.append((X+1, cnt + 1))
                    if 0 <= X-1 <= 100000 and (visited[X-1] == 0 or cnt+1 <= visited[X-1]):
                        Q.append((X-1, cnt+1))




N, K = map(int, input().split())
min_cnt = abs(K-N)
min_case = 0
# Q = deque()
visited = [0] * 100001
visited[N] = 1

start = []

if N == K:
    print(0)
    print(1)
else:
    if N > K:
        if 0 <= N-1 <= 100000:
            start.append((N-1, 1))
    else:
        if 0 <= 2*N <= 100000:
            start.append((2*N, 1))
        if 0 <= N + 1 <= 100000:
            start.append((N+1, 1))
        if 0 <= N - 1 <= 100000:
            start.append((N-1, 1))

    bfs(start)
    print(min_cnt)
    print(min_case)