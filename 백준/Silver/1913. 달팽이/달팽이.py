import sys
input = sys.stdin.readline

N = int(input())
goal = int(input())

arr = [[0] * N for _ in range(N)]
cur = N * N
curR = 0
curC = 0
curD = 0
d = [(1, 0), (0, 1), (-1, 0), (0, -1)] # 아래 왼 위 오른
goal_p = None
while True:
    arr[curR][curC] = cur
    if cur == goal:
        goal_p = (curR + 1, curC + 1)
    cur -= 1
    if cur <= 0:
        break

    while True:
        nxtR = curR + d[curD][0]
        nxtC = curC + d[curD][1]
        if 0 <= nxtR < N and 0 <= nxtC < N and not arr[nxtR][nxtC]:
            curR = nxtR
            curC = nxtC
            break
        else:
            curD = (curD + 1) % 4

for r in range(N):
    print(*arr[r])
print(*goal_p)