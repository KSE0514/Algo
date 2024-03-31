from collections import deque

def bfs(s, h):
    Q = deque()
    Q.append(s)
    while Q:
        d = Q.popleft()
        row, col = d[0], d[1]
        for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]: # 아래 위 오 왼
            newR = row + dr
            newC = col + dc
            if 0<= newR <N and 0<= newC <N and arr[newR][newC] > h and not visited[newR][newC]:
                # 범위를 벗어나지 않으면서 물에 잠기지 않았으면서 방문하지 않았으면
                visited[newR][newC] = True
                Q.append((newR, newC))


N = int(input())
arr = [list(map(int, input().split())) for _ in range(N)]

# h = 0
# for i in range(N): # 최대 높이 구하기
#     h = max(h, max(arr[i]))
h = max(map(max, arr)) # 최대 높이 구하기-gpt

maxV = 0
for h in range(h+1):
    safezone = 0
    visited = [[False] *N for _ in range(N)]
    for r in range(N):
        for c in range(N):
            if arr[r][c] > h and not visited[r][c]:
                safezone += 1
                visited[r][c] = True
                bfs((r, c), h) # 이어져 있는 물에 잠기지 않은 영역들도 전부 방문표시 해주기

    if maxV < safezone:
        maxV = safezone

print(maxV)