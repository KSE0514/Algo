import sys
from collections import deque
input = sys.stdin.readline

def bfs(n, row, col):
    dq = deque()
    dq.append((n, row, col))
    while dq:
        curN, cur_coin1, cur_coin2 = dq.popleft()
        if curN >= 10:
            return -1
        for r, c in [(1, 0), (0, 1), (-1, 0), (0, -1)]:
            new_coin1_row = cur_coin1[0] + r
            new_coin1_col = cur_coin1[1] + c
            new_coin2_row = cur_coin2[0] + r
            new_coin2_col = cur_coin2[1] + c
            
            # 동전1만 떨어지는 경우
            if (new_coin1_row < 0 or new_coin1_row >= N or new_coin1_col < 0 or new_coin1_col >= M) and 0 <= new_coin2_row < N and 0 <= new_coin2_col < M:
                return curN + 1
            # 동전2만 떨어지는 경우
            elif (new_coin2_row < 0 or new_coin2_row >= N or new_coin2_col < 0 or new_coin2_col >= M) and 0 <= new_coin1_row < N and 0 <= new_coin1_col < M:
                return curN + 1
            # 둘 다 안 떨어지는 경우
            elif 0 <= new_coin1_row < N and 0 <= new_coin1_col < M and 0 <= new_coin2_row < N and new_coin2_col < M:
                nxt = [curN+1]
                if arr[new_coin1_row][new_coin1_col] != '#':
                    nxt.append((new_coin1_row, new_coin1_col))
                else:
                    nxt.append(cur_coin1)
                if arr[new_coin2_row][new_coin2_col] != '#':
                    nxt.append((new_coin2_row, new_coin2_col))
                else:
                    nxt.append(cur_coin2)
                dq.append(nxt)

    return -1

N, M = map(int, input().split()) # 행, 열
arr = [list(input().strip()) for _ in range(N)]

cnt = 0
# 동전 초기 위치 찾기
coin1 = None
coin2 = None
for r in range(N):
    for c in range(M):
        if arr[r][c] == 'o':
            if cnt < 1:
                coin1 = (r, c)
                cnt += 1
            else:
                coin2 = (r, c)
                break

print(bfs(0, coin1, coin2)) # 버튼을 누른 횟수, 동전1의 위치, 동전2의 위치