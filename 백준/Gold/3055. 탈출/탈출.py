import sys
input = sys.stdin.readline
from collections import deque

R, C = map(int, input().split())
arr = [list(input().strip()) for _ in range(R)]
hedgehog = [[0] * C for _ in range(R)]

d = [(1, 0), (0, 1), (-1, 0), (0, -1)]
# 물이 차있는 영역 및 고슴도치 위치, 도착지점 파악
water_dq = deque()
hedgehog_dq = deque()
end = None
for r in range(R):
    for c in range(C):
        if arr[r][c] == '*': # 물 위치
            water_dq.append((r, c))
        elif arr[r][c] == 'S': # 시작 위치
            hedgehog[r][c] = 1
            hedgehog_dq.append((r, c))
        elif arr[r][c] == "D": # 도착 위치
            end = (r, c)

while hedgehog_dq:
    # 물 확산
    water_len = len(water_dq)
    for _ in range(water_len):
        cuR, cuC = water_dq.popleft()
        for dr, dc in d:
            nxtR = cuR + dr
            nxtC = cuC + dc
            if 0 <= nxtR < R and 0 <= nxtC < C and arr[nxtR][nxtC] == ".":
                arr[nxtR][nxtC] = "*"
                water_dq.append((nxtR, nxtC))

    # 고슴도치 이동
    for _ in range(len(hedgehog_dq)):
        curR, curC = hedgehog_dq.popleft()
        if (curR, curC) == end:
            print(hedgehog[curR][curC] - 1)
            sys.exit(0)

        for dr, dc in d:
            newR = curR + dr
            newC = curC + dc
            if 0 <= newR < R and 0 <= newC < C and hedgehog[newR][newC] == 0:
                if arr[newR][newC] == '.' or arr[newR][newC] == "D":
                    hedgehog[newR][newC] = hedgehog[curR][curC] + 1
                    hedgehog_dq.append((newR, newC))

#  도착 실패
print("KAKTUS")