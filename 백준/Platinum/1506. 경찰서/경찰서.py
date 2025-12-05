import sys
sys.setrecursionlimit(10**5)
input = sys.stdin.readline

idx = 0
def tarjan(u):
    global scc_cnt, idx

    idx += 1
    order[u] = idx
    parent = order[u]
    ST.append(u)

    for i in range(N):
        if i != u and G_arr[u][i] == 1: # 연결되어 있으면
            if not order[i]: # 아직 방문하지 않았으면
                parent = min(parent, tarjan(i))
            elif not finished[i]: # 방문은 했으나 scc 확정되지 않았으면
                parent = min(parent, order[i])

    if parent == order[u]:
        while True:
            t = ST.pop()
            finished[t] = True
            scc_id[t] = scc_cnt
            if t == u:
                break
        scc_cnt += 1

    return parent



N = int(input()) # 도시 개수
cost_list = list(map(int, input().split())) # 각 도시에 경찰서를 세우는 데 드는 비용
G_arr = [list(map(int, input().strip())) for _ in range(N)]

scc_cnt = 0
scc_id = [-1] * N
order = [0] * N
finished = [False] * N
ST = []

for i in range(N):
    if not order[i]:
        tarjan(i)

# scc별 최소 비용 구하기
MAX_COST = 10 ** 6
result = 0
for scc_num in range(scc_cnt):
    min_cost = MAX_COST # 각 scc별 최소 비용
    for i in range(N):
        if scc_id[i] == scc_num:
            min_cost = min(min_cost, cost_list[i])
    result += min_cost

# 출력
print(result)