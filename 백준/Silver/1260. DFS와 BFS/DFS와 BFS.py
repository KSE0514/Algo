import sys
input = sys.stdin.readline

from collections import deque

def dfs(s):
    ST = [s]
    result = []
    visited = [False] * (N + 1)
    while ST:
        q = ST.pop()
        if not visited[q]:
            visited[q] = True
            result.append(q)
            st = []
            for c in G[q]:
                if not visited[c]:
                    st.append(c)
        st.sort()
        st.reverse()
        ST = ST + st
    return result

def bfs(s):
    Q = deque()
    Q.append(s)
    result = []
    visited = [False] * (N + 1)
    visited[s] = True
    while Q:
        d = Q.popleft()
        result.append(d)
        q = []
        for c in G[d]:
            if not visited[c]:
                q.append(c)
                visited[c] = True
        q.sort()
        for i in q:
            Q.append(i)
    return result

N, M, V = map(int, input().split()) # 정점 개수, 간선 개수, 탐색 시작 정점번호
G = [[] for _ in range(N+1)]
for _ in range(M): # 간선 연결 정보
    v1, v2 = map(int, input().split())
    G[v1].append(v2)
    G[v2].append(v1)


result1 = dfs(V)
print(*result1)
result2 = bfs(V)
print(*result2)