import sys
input = sys.stdin.readline
from collections import deque

d_dic = {
    0: [-1, 0], # 북
    1: [0, 1], # 동
    2: [1, 0], # 남
    3: [0, -1] # 서
}

def bfs(r, c, d):
    dq = deque()
    dq.append((r, c, d))
    clean_cnt = 1
    arr[r][c] = 2 # 청소한 자리 2(벽: 1, 청소 안 한 자리: 0)
    while dq:
        curR, curC, curD = dq.popleft()
        is_Clean = 1 # 4방향 모두 깨끗하다면
        for i in range(1, 5):
            newD = (4 + curD - i) % 4 # 90도 회전
            newR = curR + d_dic[newD][0]
            newC = curC + d_dic[newD][1]
            if 0 <= newR < N and 0 <= newC < M and arr[newR][newC] == 0:
                arr[newR][newC] = 2
                dq.append((newR, newC, newD))
                clean_cnt += 1
                is_Clean = 0
                break
        if is_Clean: # 4방향 중 청소할 구역이 없다면 뒤로 이동
            backR = curR + d_dic[curD][0]*(-1)
            backC = curC + d_dic[curD][1]*(-1)
            if 0 <= backR < N and 0 <= backC < M:
                if arr[backR][backC] == 1:
                    return clean_cnt
                dq.append((backR, backC, curD))

    return clean_cnt



N, M = map(int, input().split()) # 행 열
r, c, d = map(int, input().split()) # 현재 로봇 청소기 위치(r, c), 방향(d)
arr = [list(map(int, input().split())) for _ in range(N)]

print(bfs(r, c, d))