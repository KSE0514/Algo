from collections import deque

def bfs(s):
    in_house = 0 # 단지 내 집의 수
    Q = deque()
    Q.append(s)
    while Q: # 큐가 빌 때까지
        d = Q.popleft()
        row, col = d[0], d[1]
        if arr[row][col]: # 방문하지 않은 집일 경우에만
            arr[row][col] = 0
            in_house += 1
            for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
                newR = row + dr
                newC = col + dc
                if 0<= newR <N and 0<= newC <N and arr[newR][newC]:
                    # 범위를 벗어나지 않으면서 집이면
                    Q.append((newR, newC))
    return in_house


N = int(input()) # 지도의 크기
arr = [list(map(int, input())) for _ in range(N)]
cnt = 0 # 단지 수 카운트
lst = []
for r in range(N):
    for c in range(N):
        if arr[r][c]: # 0이 아니면(즉, 집이면)
            cnt += 1 # 단지수 +1 하고
            in_House = bfs((r, c)) # 해당 집과 이어진 집 전부 0으로 만들기
            lst.append(in_House)
lst.sort()
lst = [cnt] + lst
for n in lst:
    print(n)