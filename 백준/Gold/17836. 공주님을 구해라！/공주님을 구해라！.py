import sys
from collections import deque
input = sys.stdin.readline

def bfs():
    dq = deque()
    dq.append((0, 0))
    visited = [[-1] * M for _ in range(N)]
    visited[0][0] = 0
    get_gram = 0

    while dq:
        curR, curC = dq.popleft()
        if (curR, curC) == gram: # 그람을 얻을 수 있다면
            get_gram = 1

        if (curR, curC) == (N-1, M-1): # 공주에게 도달할 경우
            min_v = visited[curR][curC]
            if get_gram: # 그람으로 이동했을 경우와 거리 비교
                min_v = min(min_v, visited[gram[0]][gram[1]] + gram_to_end)

            # 시간안에 도달할 경우에만 최소 시간 출력
            if min_v <= T:
                return min_v
            else:
                return "Fail"


        for r, c in [(1, 0), (0, 1), (-1, 0), (0, -1)]:
            newR = curR + r
            newC = curC + c
            if 0 <= newR < N and 0 <= newC < M and arr[newR][newC] != 1 and visited[newR][newC] == -1:
                visited[newR][newC] = visited[curR][curC] + 1
                dq.append((newR, newC))

    # 직접 공주에게 도달하지 못 하지만 그람을 얻을 수 있는 경우
    if get_gram and visited[gram[0]][gram[1]] + gram_to_end <= T:
        return visited[gram[0]][gram[1]] + gram_to_end
    return "Fail"

N, M, T = map(int, input().split())
arr = [list(map(int, input().split())) for _ in range(N)]

# 그람 위치 찾기
gram = None
for r in range(N):
    for c in range(M):
        if arr[r][c] == 2:
            gram = (r, c)
            break
    if gram:
        break

gram_to_end = abs(N-1 - gram[0]) + abs(M-1 - gram[1]) # 그람에서 공주까지의 최단거리
print(bfs())