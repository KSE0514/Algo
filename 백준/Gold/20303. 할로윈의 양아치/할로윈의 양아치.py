import sys
input = sys.stdin.readline
from collections import deque

N, M, K = map(int, input().split()) # 아이들 수, 아이들 친구 관계 수, 어른들을 나오게 하는 우는 아이 수
G = [[] for _ in range(N+1)]
candy_list = [0] + list(map(int, input().split()))
group = [] # 그룹 별 (인원 수, 캔디 수)를 담을 배열
visited = [False] * (N+1)
dp = [0] * K # (배낭 문제 유사) idx이하의 인원수에게 뺏을 수 있는 최대 사탕 개수

def bfs(start, st_candy):
    global K
    Q = deque()
    Q.append((start, st_candy))
    cnt_member = 0 # 그룹 인원 수 세는 용도
    cnt_candy = 0 # 그룹의 누적 캔디 수를 세는 용도
    while Q:
        cur_num, cur_candy = Q.popleft()
        if not visited[cur_num]:
            cnt_candy += cur_candy
            cnt_member += 1
            visited[cur_num] = True
            for nxt_num in G[cur_num]:
                if not visited[nxt_num]:
                    Q.append((nxt_num, candy_list[nxt_num]))
    if cnt_member < K:
        group.append((cnt_member, cnt_candy))

for _ in range(M):
    a, b = map(int, input().split())
    G[a].append(b)
    G[b].append(a)

for i in range(1, N+1):
    if not visited[i]:
        bfs(i, candy_list[i])

if group:
    for sum_mem, sum_candy in group:
        for d in range(K-1, sum_mem-1, -1):
            dp[d] = max(dp[d], dp[d-sum_mem] + sum_candy)

    print(max(dp))
else:
    print(0)