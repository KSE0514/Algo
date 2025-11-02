import sys
from collections import deque
input = sys.stdin.readline

N = int(input())
gift1 = [0] * (N+1)
gift2 = [0] * (N+1)
indegree = [0] * (N+1)
for i in range(1, N+1):
    x, y = map(int, input().split())
    gift1[i] = x
    gift2[i] = y
    indegree[x] += 1
    indegree[y] += 1

dq = deque(i for i in range(1, N+1) if indegree[i] < 2)

while dq:
    cur = dq.popleft()
    x = gift1[cur]
    y = gift2[cur]
    indegree[x] -= 1
    if indegree[x] == 1:
        dq.append(x)
    indegree[y] -= 1
    if indegree[y] == 1:
        dq.append(y)

result = [i for i in range(1, N+1) if indegree[i] == 2]

if result:
    print(len(result))
    print(*result)
else:
    print(0)