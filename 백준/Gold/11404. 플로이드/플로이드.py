import sys
input = sys.stdin.readline

n = int(input()) # 도시 개수
m = int(input()) # 버스 개수
INF = float('inf')
arr = [[INF] * (n + 1) for _ in range(n+1)]

for r in range(1, n+1):
    for c in range(1, n+1):
        if r == c:
            arr[r][c] = 0
            break

for _ in range(m):
    a, b, c = map(int, input().split())
    arr[a][b] = min(arr[a][b], c)

for i in range(1, n+1):
    for r in range(1, n+1):
        for c in range(1, n+1):
            arr[r][c] = min(arr[r][c], arr[r][i] + arr[i][c])

for idx in range(1, n+1):
    arr[idx] = [0 if x == INF else x for x in arr[idx]]
    print(*arr[idx][1:])