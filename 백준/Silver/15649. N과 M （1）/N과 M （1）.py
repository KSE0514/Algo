def pre(k):
    if k == M:
        print(*result)
        return

    for i in range(1, N+1):
        if not visited[i]:
            visited[i] = True
            result[k] = i
            pre(k+1)
            visited[i] = False

N, M = map(int, input().split())
result = [-1]*M
visited = [False]*(N+1)
pre(0)