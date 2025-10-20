import sys
from collections import deque
input = sys.stdin.readline

def change_red(r, c, cur_r, cur_b):
    if r:
        if r == 1:  # 아래로 이동이었고
            if cur_r[0] < cur_b[0]:  # 빨간 구슬이 더 위에 있었다면
                return 1
        else:  # 위로 이동이었고
            if cur_r[0] > cur_b[0]:  # 빨간 구슬이 더 아래 있었다면
                return 1
    elif c:
        if c == 1:  # 오른 이동이었고
            if cur_r[1] < cur_b[1]:  # 빨간 구슬이 더 왼쪽에 있었다면
                return 1
        else:  # 왼 이동이었고
            if cur_r[1] > cur_b[1]:  # 빨간 구슬이 더 오른쪽에 있었다면
                return 1
    return 0

def gravity(cur_p, d):
    r, c = d
    while 0 < cur_p[0] + r < N-1 and 0 < cur_p[1] + c < M-1 and arr[cur_p[0] + r][cur_p[1] + c] != '#':
        cur_p = (cur_p[0] + r, cur_p[1] + c)
        if cur_p == goal:
            return goal # 이동중 goal과 위치가 같아지는 때가 있다면 goal을 반환하기
    return cur_p

def bfs(cnt, red, blue):
    dq = deque()
    dq.append((cnt, red, blue))

    while dq:
        cur_n, cur_r, cur_b = dq.popleft()

        if cur_n >= 10:
            return -1

        for r, c in [(1, 0), (0, 1), (-1, 0), (0, -1)]:
            new_r = gravity(cur_r, (r, c)) # 빨간구슬 중력 이동
            new_b = gravity(cur_b, (r, c)) # 파란구슬 중력 이동

            if new_r == goal:
                if new_b != goal: # 빨간 구슬만 빠질 경우 중력이동 횟수 리턴
                    return cur_n + 1

            else: # 둘 다 빠지지 않으면서 제자리가 아닌 경우에만 dq에 append
                if new_b != goal and not (cur_r == new_r and cur_b == new_b):
                    if new_r == new_b:
                        change_r = change_red(r, c, cur_r, cur_b) # 1 -> 빨간 구슬 좌표 정정, 0 -> 파란구슬 좌표 정정
                        if change_r:
                            new_r = (new_r[0] - r, new_r[1] - c)
                        else:
                            new_b = (new_b[0] - r, new_b[1] - c)
                    dq.append((cur_n + 1, new_r, new_b))
    return -1

N, M = map(int, input().split()) # 행, 열
arr = [list(input().strip()) for _ in range(N)]

# 빨간 구슬, 파란 구슬, 구멍 위치 찾기
red = None
blue = None
goal = None
for r in range(N):
    for c in range(M):
        if arr[r][c] == 'R':
            red = (r, c)
            arr[r][c] = '.'
        elif arr[r][c] == 'B':
            blue = (r, c)
            arr[r][c] = '.'
        elif arr[r][c] == 'O':
            goal = (r, c)

print(bfs(0, red, blue))