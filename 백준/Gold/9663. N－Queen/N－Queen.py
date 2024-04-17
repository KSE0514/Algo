def is_valid(row, col):
    for i in range(row):
        if path[i][1] == col or abs(path[i][0] - row) == abs(path[i][1] - col):
            return False
    return True

def perm(k):
    global cnt

    if k == N:
        cnt += 1
        return

    for i in range(N):
        if not visited[i] and is_valid(len(path), i):
            path.append((len(path), i))
            visited[i] = True
            perm(k + 1)
            path.pop()
            visited[i] = False

N = int(input())
path = []
visited = [False] * N
cnt = 0
perm(0)
print(cnt)
