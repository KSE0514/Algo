import sys
from collections import deque
sys.setrecursionlimit(10 ** 5)
input = sys.stdin.readline


N, M = map(int, input().split())  # 교차로 수, 도로 수
G = [[] for _ in range(N + 1)]
RG = [[] for _ in range(N + 1)] # 역방향 그래프
for _ in range(M):
    n1, n2 = map(int, input().split())
    G[n1].append(n2)
    RG[n2].append(n1)

# 현금 정보 입력
money = [0] * (N + 1)
for i in range(1, N + 1):
    money[i] = int(input())

# 출발지 및 레스토랑 정보 입력
S, P = map(int, input().split())  # 출발 장소, 레스토랑 개수
restaurant = list(map(int, input().split()))  # 레스토랑이 있는 교차로 번호

# kosaraju_(1) dfs로 종료순서 쌓기
visited = [False] * (N+1)
stack = []  # 기존에 사용하던 finish-order 스택 이름 유지

for start_node in range(1, N+1):
    if visited[start_node]:
        continue
    st = [(start_node, False)]
    while st:
        node, processed = st.pop()
        if processed:
            stack.append(node)  # 후처리 시점에 종료순서에 넣음
            continue
        if visited[node]:
            continue
        visited[node] = True
        st.append((node, True))  # 후처리 마커
        # 자식들을 스택에 넣음 (방문 안된 것만)
        for v in G[node]:
            if not visited[v]:
                st.append((v, False))

# scc 초기 세팅
visited = [False] * (N+1)
scc_id = [-1] * (N+1)
scc_money = []
scc_cnt = 0

for u in reversed(stack):
    if visited[u]:
        continue
    # 새 SCC 생성
    scc_money.append(0)
    st = [u]
    visited[u] = True
    while st:
        x = st.pop()
        scc_id[x] = scc_cnt
        scc_money[scc_cnt] += money[x]
        for v in RG[x]:
            if not visited[v]:
                visited[v] = True
                st.append(v)
    scc_cnt += 1

# scc를 기준으로 그래프, 시작점, 레스토랑 위치 재구성
scc_G = [set() for _ in range(scc_cnt)]
scc_indegree = [0] * scc_cnt
start = scc_id[S]

# __그래프 재구성
for u in range(1, N + 1):
    a = scc_id[u]
    for v in G[u]:
        b = scc_id[v]
        if a != b and b not in scc_G[a]:
            scc_G[a].add(b)
            scc_indegree[b] += 1

# __레스토랑 위치 재구성
exist_res = [False] * scc_cnt  # 각 교차로에 레스토랑이 있는지 여부
for r in restaurant:
    id = scc_id[r]
    exist_res[id] = True

# 도달할 수 있는 scc에 대하여 최대 누적 금액 계산하기
money_dp = [-1] * scc_cnt  # 각 scc별 현금 최대 누적 금액
dq = deque()
for i in range(scc_cnt):
    if scc_indegree[i] == 0:
        dq.append(i)
money_dp[start] = scc_money[start]
# __위상정렬
while dq:
    cur = dq.popleft()
    for nxt in list(scc_G[cur]):
        scc_indegree[nxt] -= 1
        if money_dp[cur] != -1:  # 출발점에서 도달 가능한 scc인 경우만 갱신
            money_dp[nxt] = max(money_dp[nxt], money_dp[cur] + scc_money[nxt])
        if scc_indegree[nxt] == 0:
            dq.append(nxt)

max_money = 0  # '출발점이 있는 scc'에서 도달가능한 '레스토랑이 있는 scc'까지의 최대 누적 금액
for i in range(scc_cnt):
    if exist_res[i]:  # 레스토랑이 있는 scc이면
        max_money = max(max_money, money_dp[i])

# 출력
print(max_money)




# ////////////////////////// 1차 시도(tarjan + 위상정렬)_런타임 에러
# import sys
# from collections import deque
# sys.setrecursionlimit(10**5)
# input = sys.stdin.readline
#
# def tarjan(u):
#     global ord_idx, scc_cnt
#
#     ord_idx += 1
#     order[u] = ord_idx
#     parent = order[u]
#     ST.append(u)
#
#     for v in G[u]:
#         if not order[v]:
#             parent = min(parent, tarjan(v))
#         elif not finished[v]:
#             parent = min(parent, order[v])
#
#     if parent == order[u]:
#         while True:
#             t = ST.pop()
#             finished[t] = True
#             scc_id[t] = scc_cnt
#             if t == u:
#                 break
#         scc_cnt += 1
#
#     return parent
#
# N, M = map(int, input().split()) # 교차로 수, 도로 수
# G = [[] for _ in range(N+1)]
# for _ in range(M):
#     n1, n2 = map(int, input().split())
#     G[n1].append(n2)
#
# # 현금 정보 입력
# money = [0] * (N+1)
# for i in range(1, N+1):
#     money[i] = int(input())
#
# # 출발지 및 레스토랑 정보 입력
# S, P = map(int, input().split()) # 출발 장소, 레스토랑 개수
# restaurant = list(map(int, input().split())) # 레스토랑이 있는 교차로 번호
#
# # scc 초기 세팅
# ord_idx = 0
# scc_cnt = 0
# order = [0] * (N+1)
# finished = [False] * (N+1)
# ST = []
# scc_id = [-1] * (N+1)
#
# for i in range(1, N+1):
#     if not order[i]:
#         tarjan(i)
#
# # scc를 기준으로 그래프, 시작점, 현금, 레스토랑 위치 재구성
# scc_money = [0] * scc_cnt
# scc_G = [set() for _ in range(scc_cnt)]
# scc_indegree = [0] * scc_cnt
# start = scc_id[S]
#
# # __현금 재구성
# for i in range(1, N+1):
#     id = scc_id[i]
#     scc_money[id] += money[i]
#
# # __그래프 재구성
# for u in range(1, N+1):
#     for v in G[u]:
#         a = scc_id[u]
#         b = scc_id[v]
#         if a != b and b not in scc_G[a]:
#             scc_G[a].add(b)
#             scc_indegree[b] += 1
#
# # __레스토랑 위치 재구성
# exist_res = [False] * scc_cnt # 각 교차로에 레스토랑이 있는지 여부
# for r in restaurant:
#     id = scc_id[r]
#     exist_res[id] = True
#
# # 도달할 수 있는 scc에 대하여 최대 누적 금액 계산하기
# money_dp = [-1] * scc_cnt # 각 scc별 현금 최대 누적 금액
# dq = deque()
# for i in range(scc_cnt):
#     if scc_indegree[i] == 0:
#         dq.append(i)
# money_dp[start] = scc_money[start]
# # __위상정렬
# while dq:
#     cur = dq.popleft()
#     for nxt in list(scc_G[cur]):
#         scc_indegree[nxt] -= 1
#         if money_dp[cur] != -1: # 출발점에서 도달 가능한 scc인 경우만 갱신
#             money_dp[nxt] = max(money_dp[nxt], money_dp[cur] + scc_money[nxt])
#         if scc_indegree[nxt] == 0:
#             dq.append(nxt)
#
# max_money = 0 # '출발점이 있는 scc'에서 도달가능한 '레스토랑이 있는 scc'까지의 최대 누적 금액
# for i in range(scc_cnt):
#     if exist_res[i]: # 레스토랑이 있는 scc이면
#         max_money = max(max_money, money_dp[i])
#
# # 출력
# print(max_money)