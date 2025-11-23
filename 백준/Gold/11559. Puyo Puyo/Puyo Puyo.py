import sys
from collections import deque
input = sys.stdin.readline

def bfs(stR, stC):
    dq = deque()
    dq.append((stR, stC))
    cur_puyo = arr[stR][stC]
    bomb_list = [(stR, stC)]
    while dq:
        curR, curC = dq.popleft()
        for r, c in [(1, 0), (0, 1), (-1, 0), (0, -1)]:
            nxtR = curR + r
            nxtC = curC + c
            if 0 <= nxtR < 12 and 0 <= nxtC < 6 and not visited[nxtR][nxtC] and arr[nxtR][nxtC] == cur_puyo:
                visited[nxtR][nxtC] = True
                bomb_list.append((nxtR, nxtC))
                dq.append((nxtR, nxtC))

    if len(bomb_list) >= 4:
        for row, col in bomb_list:
            arr[row][col] = '.'
        return 1
    else:
        for remain_puyo in bomb_list:
            move_puyo.append(remain_puyo)
        return 0

def gravity(move_puyo): # 중력 이동
    move_puyo = sorted(move_puyo, key = lambda x : -x[0])
    for curR, curC in move_puyo:
        newR = curR
        while newR + 1 < 12 and arr[newR + 1][curC] == '.':
            newR += 1
        if newR != curR:
            arr[newR][curC] = arr[curR][curC]
            arr[curR][curC] = '.'
    return

arr = [list(input().strip()) for _ in range(12)]

st_row = -1
for r in range(12):
    for c in range(6):
        if arr[r][c] != '.':
            st_row = r
            break
    if st_row != -1:
        break


cnt = 0
while True:
    visited = [[False]*6 for _ in range(12)]
    move_puyo = []
    flag = 0 # 한 번이라도 연쇄가 일어났는지 확인용
    for r in range(st_row, 12):
        for c in range(6):
            if arr[r][c] != '.' and not visited[r][c]:
                visited[r][c] = True
                bomb = bfs(r, c)
                if bomb:
                    flag = 1

    if flag:
        cnt += 1
        gravity(move_puyo)
    else:
        if (r, c) == (11, 5):
            print(cnt)
            break