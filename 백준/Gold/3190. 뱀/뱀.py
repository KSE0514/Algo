import sys
input = sys.stdin.readline
from collections import deque

def Dummy():
    dq = deque([(0, 0)])
    d = [(0, 1), (1, 0), (0, -1), (-1, 0)] # 오/아래/왼/위
    d_idx = 0
    snake_len = 0 # 뱀의 길이
    cnt = 0
    criteria_cnt, change_v = change_v_list.popleft()
    while True:
        cnt += 1
        curR, curC = map(int, dq[snake_len])
        # 뱀 머리 이동
        newR = curR + d[d_idx][0]
        newC = curC + d[d_idx][1]

        if cnt == criteria_cnt: # 방향 기준 시간이 끝나면 다음 이동 전에 방향 바꿔주기
            if change_v == 'D': # 오른쪽으로 회전이라면
                d_idx = (d_idx + 1) % 4
            else: # 왼쪽으로 회전이라면
                d_idx -= 1
                if d_idx == -1:
                    d_idx = 3

            # 다음 방향 기준이 있다면 방향 기준 업데이트
            if change_v_list:
                criteria_cnt, change_v = change_v_list.popleft()

        # [종료 조건]_보드를 벗어나거나 몸과 만나면
        if newR < 0 or newR >= N or newC < 0 or newC >= N or (newR, newC) in dq:
            print(cnt)
            break
        # 종료하지 않을 경우
        dq.append((newR, newC)) # 머리 이동
        # 사과가 있다면
        if apple_arr[newR][newC]:
            snake_len += 1 # 뱀 길이 증가
            apple_arr[newR][newC] = False
        else:
            dq.popleft() # 꼬리 이동


N = int(input()) # 보드 크기
K = int(input()) # 사과 개수

# 사과 좌표 채우기
apple_arr = [[False] * N for _ in range(N)]
for _ in range(K):
    a_row, a_col = map(int, input().split())
    apple_arr[a_row-1][a_col-1] = True

L = int(input()) # 방향 전환 수
change_v_list = deque() # 방향 전환 리스트
for _ in range(L):
    X, C = input().split()
    change_v_list.append((int(X), C))

Dummy()