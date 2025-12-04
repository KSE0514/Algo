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

    for v in G[u]:
        if not order[v]: # 방문하지 않았다면
            parent = min(parent, tarjan(v))
        elif not finished[v]: # 방문은 했지만 scc 확정 전이라면
            parent = min(parent, order[v])

    if parent == order[u]:
        while True:
            t = ST.pop()
            finished[t] = True
            sccId[t] = scc_cnt
            if t == u:
                break
        scc_cnt += 1

    return parent

V, E = map(int, input().split()) # 정점, 간선 수
G = [[] for _ in range(V + 1)]
for _ in range(E):
    A, B = map(int, input().split()) # A -> B 인 간선
    G[A].append(B)

sccId = [-1] * (V + 1) # 각 정점의 sccId
scc_cnt = 0 # 생성된 scc 개수
order = [0] * (V + 1)
finished = [False] * (V + 1)
ST = []

# scc 분해
for i in range(1, V+1):
    if not order[i]:
        tarjan(i)

# 출력1_scc 개수
print(scc_cnt)

result = []
for scc_id in range(scc_cnt):
    scc = []
    for n in range(1, V + 1):
        if sccId[n] == scc_id:
            scc.append(n)
    scc.append(-1)
    result.append([*scc])

# 출력2_각 scc 구성
result.sort()
for scc_res in result:
    print(*scc_res)