from collections import deque

dr = [0, 1, 0, -1]
dc = [1, 0, -1, 0]

def bfs():
    queue = deque()
    visited = [[False] * c for _ in range(r)]
    queue.append((0, 0))
    visited[0][0] = True
    cnt = 0

    while queue:
        row, col = queue.popleft()
        for i in range(4):
            nr = row + dr[i]
            nc = col + dc[i]
            if 0 <= nr < r and 0 <= nc < c and not visited[nr][nc]:
                if arr[nr][nc] == 0:
                    visited[nr][nc] = True
                    queue.append((nr, nc))
                elif arr[nr][nc] == 1:
                    arr[nr][nc] = 0
                    cnt += 1
                    visited[nr][nc] = True
    result.append(cnt)
    return cnt



r, c = map(int, input().split())
arr = [list(map(int, input().split())) for _ in range(r)]

time = 0
result = []

while True:
    cnt = bfs()
    if cnt == 0:
        break
    time += 1

print(time)
print(result[-2])