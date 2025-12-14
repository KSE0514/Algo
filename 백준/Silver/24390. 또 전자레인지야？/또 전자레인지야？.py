import sys
from collections import deque
input = sys.stdin.readline

time = input().strip().split(':')
M = int(time[0])
S = int(time[1])
S += M * 60
S //= 10
visited = [[1e6] * (S+1) for _ in range(2)]

dq = deque()
if S == 3:
    print(1)
    exit(0)

visited[0][0] = 0
dq.append((0, 0))
while dq:
    started, curT = dq.popleft()
    # 시작버튼 누르기
    if started:
        nxtT = curT + 3
    else:
        if curT > 0:
            nxtT = curT
        else:
            nxtT = 3
    if 0 <= nxtT <= S and visited[1][nxtT] > visited[started][curT] + 1:
        visited[1][nxtT] = visited[started][curT] + 1
        dq.append((1, nxtT))
    # 시작버튼 외의 버튼 누르기
    for p in [1, 6, 60]:
        nxtT = curT + p
        if 0 <= nxtT <= S and visited[started][nxtT] > visited[started][curT] + 1:
            visited[started][nxtT] = visited[started][curT] + 1
            dq.append((started, nxtT))

print(visited[1][S])
