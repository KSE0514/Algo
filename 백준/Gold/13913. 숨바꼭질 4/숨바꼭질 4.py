import sys
from collections import deque
input = sys.stdin.readline

def bfs(st):
    dq = deque()
    dq.append(st)
    parent = {st: -1} # 시작 위치 표시겸 방문 표시

    while dq:
        cur = dq.popleft()
        if cur == K:
            return parent
        if cur < K:
            for nxt in (cur - 1, cur + 1, cur * 2):
                if 0 <= nxt <= MAX_SIZE and nxt not in parent:
                    parent[nxt] = cur
                    dq.append(nxt)
        else:
            nxt = cur - 1
            if 0 <= nxt <= MAX_SIZE and nxt not in parent:
                parent[nxt] = cur
                dq.append(nxt)


MAX_SIZE = 10**5 + 1
N, K = map(int, input().split()) # 수빈이 위치, 동생 위치
if N == K:
    print(0)
    print(N)
    exit(0)

parent = bfs(N)

# 동생 찾는 방법 역추적
result = []
cur = K
while cur != -1:
    result.append(cur)
    cur = parent[cur]

# 출력1
print(len(result) - 1)
# 출력2
print(" ".join(map(str, reversed(result))))