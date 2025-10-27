import sys
sys.setrecursionlimit(10**5)
input = sys.stdin.readline

def dfs(row, col):
    if dp[row][col]:
        return dp[row][col]

    dp[row][col] = 1
    for r, c in [(1, 0), (0, 1), (-1, 0), (0, -1)]:
        new_r = row + r
        new_c = col + c
        if 0 <= new_r < n and 0 <= new_c < n and arr[new_r][new_c] > arr[row][col]:
            dp[row][col] = max(dp[row][col], dfs(new_r, new_c) + 1)
    return dp[row][col]


n = int(input())
arr = [list(map(int, input().split())) for _ in range(n)]
dp = [[0] * n for _ in range(n)]

max_move = 0
for r in range(n):
    for c in range(n):
        max_move = max(max_move, dfs(r, c))

print(max_move)


# ################# 1차 시도_시간 초과
# import sys
# sys.stdin = open("1937input.txt", "r")
# input = sys.stdin.readline
#
# def dfs(st_r, st_c):
#     ST = [(st_r, st_c, 1)]
#     visited = [[False] * n for _ in range(n)]
#     visited[st_r][st_c] = True
#     max_m = 1
#
#     while ST:
#         curR, curC, curM = ST.pop()
#         for r, c in [(1, 0), (0, 1), (-1, 0), (0, -1)]:
#             newR = curR + r
#             newC = curC + c
#             if 0 <= newR < n and 0 <= newC < n and arr[curR][curC] < arr[newR][newC]:
#                 visited[newR][newC] = True
#                 max_m = max(max_m, curM + 1)
#                 ST.append((newR, newC, curM+1))
#     return max_m
#
#
# n = int(input())
# arr = [list(map(int, input().split())) for _ in range(n)]
# dp = [[0] * n for _ in range(n)]
# # print(arr)
# max_move = 0
# for row in range(n):
#     for col in range(n):
#         dp[row][col] = 1
#         for r, c in [(1, 0), (0, 1), (-1, 0), (0, -1)]:
#             new_row = row + r
#             new_col = col + c
#             if 0 <= new_row < n and 0 <= new_col < n:
#                 if arr[row][col] < arr[new_row][new_col]:
#                     if dp[new_row][new_col]: # 이전에 탐색한 적이 있다면 이전 값 활용
#                         dp[row][col] = max(dp[row][col], dp[new_row][new_col] + 1)
#                     else: # 탐색한 적이 없다면 dfs
#                         dp[row][col] = max(dp[row][col], dfs(row, col))
#
#         max_move = max(max_move, dp[row][col])
#
# print(max_move)