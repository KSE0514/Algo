import sys
sys.setrecursionlimit(10**5)
input = sys.stdin.readline

def dfs(d, cur_r, cur_c):
    global case_cnt
    if d >= K:
        if d == K and cur_r == 0 and cur_c == C - 1:
            case_cnt += 1
        return

    for r, c in [(1, 0), (0, 1), (-1, 0), (0, -1)]:
        new_r = cur_r + r
        new_c = cur_c + c
        if 0 <= new_r < R and 0 <= new_c < C and not visited[new_r][new_c] and arr[new_r][new_c] == '.':
            visited[new_r][new_c] = True
            dfs(d+1, new_r, new_c)
            visited[new_r][new_c] = False

R, C, K = map(int, input().split())
arr = [list(input().strip()) for _ in range(R)]
visited = [[False] * C for _ in range(R)]
case_cnt = 0

visited[R-1][0] = True
dfs(1, R - 1, 0)
print(case_cnt)