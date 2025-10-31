import sys
sys.setrecursionlimit(10 ** 5)
input = sys.stdin.readline

def dfs(d, curR, curC):
    if d == 6:
        result_set.add("".join(ST))
        return

    for r, c in [(1, 0), (0, 1), (-1, 0), (0, -1)]:
        newR = curR + r
        newC = curC + c
        if newR < 0 or newR >= 5 or newC < 0 or newC >= 5:
            continue
        ST.append(arr[newR][newC])
        dfs(d+1, newR, newC)
        ST.pop()

ST = []
result_set = set()
arr = [list(map(str, input().split())) for _ in range(5)]

for r in range(5):
    for c in range(5):
        dfs(0, r, c)
print(len(result_set))