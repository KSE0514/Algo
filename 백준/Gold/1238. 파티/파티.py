import sys
input = sys.stdin.readline

# 1번부터 N번까지 집 -> 파티 최소시간 구하기
# for문으로 1번부터 N번까지 한 번씩 다익스트라 돌리면 시간 초과됨
# 해결방안: 파티장 ->집 방향으로 경로를 만들고 다익스트라 돌려서 각 마을에서 파티장까지 걸리는 최소시간 한 번에 구하기
def dijk1(now):
    U = []
    D = [INF] * (N+1)

    D[now] = 0
    while len(U) < N:
        MinV = INF
        for i in range(1, N+1):
            if i in U: continue
            if MinV > D[i]:
                MinV = D[i]
                now = i

        U.append(now)

        for i in range(1, N+1):
            if i in U: continue
            if T1[now][i]:
                D[i] = min(D[i], D[now] + T1[now][i])
    return D

# 파티 ->집
def dijk2(now):
    U = []
    D = [INF] * (N + 1)

    D[now] = 0
    while len(U) < N:
        MinV = INF
        for i in range(1, N + 1):
            if i in U: continue
            if MinV > D[i]:
                MinV = D[i]
                now = i

        U.append(now)

        for i in range(1, N + 1):
            if i in U: continue
            if T2[now][i]:
                D[i] = min(D[i], D[now] + T2[now][i])
    return D

N, M, X = map(int, input().split()) # 학생 수, 도로 수, 파티 장소
T1 = [[0]*(N+1) for _ in range(N+1)]
T2 = [[0]*(N+1) for _ in range(N+1)] # T[r][c] == r -> c 소요 시간
# 간선 방향 및 소요 시간 정리
for _ in range(M):
    s, e, Ti = map(int, input().split())
    T1[e][s] = Ti
    T2[s][e] = Ti

MaxV = 0
INF = int(1e6)
NtoXlst = dijk1(X)
XtoNlst = dijk2(X)
for n in range(1, N+1):
    n_time = NtoXlst[n] + XtoNlst[n]
    if MaxV < n_time:
        MaxV = n_time

print(MaxV)