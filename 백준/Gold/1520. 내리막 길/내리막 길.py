import sys
sys.setrecursionlimit(10**5)
input = sys.stdin.readline

M, N = map(int, input().split()) # 행, 열
arr = [list(map(int, input().split())) for _ in range(M)]

dp = [[-1] * N for _ in range(M)] # dp[r][c] === (r,c)에서 (M-1, N-1)까지 갈  수 있는 경로의 수
d = [1, 0, -1, 0]
def bfs(curR, curC):
    if (curR, curC) == (M-1, N-1):
        return 1
    if dp[curR][curC] != -1:
        return dp[curR][curC]

    dp[curR][curC] = 0

    for i in range(4):
        newR = curR + d[i]
        newC = curC + d[(i+1)%4]
        if 0 <= newR < M and 0 <= newC < N and  arr[curR][curC] > arr[newR][newC]:
            dp[curR][curC] += bfs(newR, newC)

    return dp[curR][curC]

print(bfs(0, 0))