import sys
sys.setrecursionlimit(10**5)
input = sys.stdin.readline


N = int(input())
LOG = 17

G = [[] for _ in range(N+1)]
parent = [[0] * (N+1) for _ in range(LOG)]
depth = [0] * (N+1)

for _ in range(N-1):
    a, b = map(int, input().split())
    G[a].append(b)
    G[b].append(a)

def dfs(cur, par): # 각 노드의 깊이 및 1칸 부모 저장
    for nxt in G[cur]:
        if nxt != par:
            depth[nxt] = depth[cur] + 1
            parent[0][nxt] = cur
            dfs(nxt, cur)

dfs(1, 0)

# parent[k][v] 채우기
for k in range(1, LOG):
    for v in range(1, N+1):
        parent[k][v] = parent[k-1][parent[k-1][v]]

def lca(a, b):
    # 깊이 맞추기
    if depth[a] < depth[b]:
        a, b = b, a

    diff = depth[a] - depth[b]
    for k in range(LOG):
        if diff & (1 << k):
            a = parent[k][a]

    if a == b:
        return a

    # 공통 조상 직전까지 올리기
    for k in reversed(range(LOG)):
        if parent[k][a] != parent[k][b]:
            a = parent[k][a]
            b = parent[k][b]
    return parent[0][a]

M = int(input())
for _ in range(M):
    n1, n2 = map(int, input().split())
    print(lca(n1, n2))


# ########## 2차 시도_ 시간초과
# def find_parents(n1, n2):
#     if n1 == n2:
#         return n1
#     while n1 != 0:
#         visited[n1] = True
#         n1 = parent[n1]
#     common = n2
#     while n2 != 0:
#         common = n2
#         if visited[n2]:
#             break
#         n2 = parent[n2]
#     return common
#
# def preorder(root, cur):
#     parent[cur] = root
#     for child in G[cur]:
#         if child != root:
#             preorder(cur, child)
#
# N = int(input())
# parent = [-1] * (N+1)
# G = [[] for _ in range(N+1)]
# for _ in range(N-1):
#     A, B = map(int, input().split())
#     G[A].append(B)
#     G[B].append(A)
#
# preorder(0, 1) # 부모 정보 채우기
#
# M = int(input())
# for _ in range(M):
#     n1, n2 = map(int, input().split())
#     visited = [False] * (N+1)
#     print(find_parents(n1, n2))




# #############    1차 시도_ 시간초과
# def find_parents(start):
#     parents_list = []
#     while start != 0:
#         parents_list.append(start)
#         start = parent[start]
#     parents_list.reverse()
#     return parents_list
#
# def preorder(root, cur):
#     parent[cur] = root
#     for child in G[cur]:
#         if child != root:
#             preorder(cur, child)
#
# N = int(input())
# parent = [-1] * (N+1)
# G = [[] for _ in range(N+1)]
# for _ in range(N-1):
#     A, B = map(int, input().split())
#     G[A].append(B)
#     G[B].append(A)
#
# preorder(0, 1) # 부모 정보 채우기
#
# M = int(input())
# for _ in range(M):
#     n1, n2 = map(int, input().split())
#     n1_parents = find_parents(n1) # n1의 모든 조상을 담은 리스트
#     n2_parents = find_parents(n2) # n2의 모든 조상을 담은 리스트
#     min_len = min(len(n1_parents), len(n2_parents))
#     common_parent = 1
#     for idx in range(min_len):
#         if n1_parents[idx] != n2_parents[idx]:
#             break
#         common_parent = n1_parents[idx]
#     print(common_parent)