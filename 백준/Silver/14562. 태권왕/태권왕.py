import sys
from collections import deque
input = sys.stdin.readline

def bfs(s, t):
    dq = deque()
    dq.append((s, t, 0)) # 내 점수, 상대 점수, 연속 발차기 횟수

    while dq:
        curS, curT, curCnt = dq.popleft()
        if curS == curT:
            return curCnt

        for isDoublePoint in range(2):
            newS = curS ** isDoublePoint + curS
            newT = 3 * isDoublePoint + curT
            if newS <= newT:
                dq.append((newS, newT, curCnt+1))

C = int(input()) # 테케 개수
for _ in range(C):
    S, T = map(int, input().split()) # 내 점수, 상대 점수
    print(bfs(S, T))