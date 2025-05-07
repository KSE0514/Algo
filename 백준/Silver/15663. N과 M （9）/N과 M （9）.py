import sys
input = sys.stdin.readline

def com(d, s):
    global N, M
    if d == M:
        if s not in ST:
            ST.append(s)
        return

    for idx in range(N):
        if not visited[idx]:
            visited[idx] = True
            com(d+1, s +'.'+ str(num_list[idx]))
            visited[idx] = False


N, M = map(int, input().split())
num_list = list(map(int, input().split()))
num_list.sort()
visited = [False]*N

ST = []
com(0, '')

for s in ST:
    result = s.split('.')
    print(" ".join(result[1:]))