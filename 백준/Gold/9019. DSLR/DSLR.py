import sys
from collections import deque
input = sys.stdin.readline

def bfs(start):
    dq = deque([start])
    visited[start] = 0

    while dq:
        cur = dq.popleft()
        if cur == B:
            return

        for com in ['D', 'S', 'L', 'R']:
            nxt = cur
            if com == 'D':
                nxt = (nxt * 2) % MAX_SIZE
            elif com == 'S':
                nxt -= 1
                if nxt < 0:
                    nxt = 9999
            elif com == 'L':
                d1 = cur // 1000
                nxt = (cur % 1000) * 10 + d1
            elif com == 'R':
                d4 = cur % 10
                nxt = d4 * 1000 + (cur // 10)

            if 0 <= nxt < MAX_SIZE and visited[nxt] == -1:
                visited[nxt] = cur
                visite_log[nxt] = com
                dq.append(nxt)


T = int(input())
MAX_SIZE = 10000
for _ in range(T):
    A, B = map(int, input().split())
    visited = [-1] * MAX_SIZE
    visite_log = [None] * MAX_SIZE
    bfs(A)
    
    # 역추적
    trace = []
    cur = B
    while visite_log[cur]:
        trace.append(visite_log[cur])
        cur = visited[cur]
    trace.reverse()
    print("".join(trace))
