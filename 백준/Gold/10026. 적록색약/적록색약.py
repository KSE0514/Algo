import sys
from collections import deque
input = sys.stdin.readline


def RGB(s, color):
    Q = deque()
    Q.append(s)
    while Q:
        row, col = Q.popleft()
        if not visited1[row][col]:
            visited1[row][col] = True
            for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]: # 아래 위 오른 왼
                newR = row + dr
                newC = col + dc
                if 0<= newR < N and 0<= newC <N and not visited1[newR][newC] and arr[newR][newC] == color:
                    Q.append((newR, newC))

def GGB(s, color):
    Q = deque()
    Q.append(s)
    if color == 'B':
        while Q:
            row, col = Q.popleft()
            if not visited2[row][col]:
                visited2[row][col] = True
                for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]:  # 아래 위 오른 왼
                    newR = row + dr
                    newC = col + dc
                    if 0 <= newR < N and 0 <= newC < N and not visited2[newR][newC] and arr[newR][newC] == color:
                        Q.append((newR, newC))
    else:
        while Q:
            row, col = Q.popleft()
            if not visited2[row][col]:
                visited2[row][col] = True
                for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]:  # 아래 위 오른 왼
                    newR = row + dr
                    newC = col + dc
                    if 0 <= newR < N and 0 <= newC < N and not visited2[newR][newC] and (arr[newR][newC] == 'R' or arr[newR][newC] == 'G'):
                        Q.append((newR, newC))


N = int(input())
arr = [input().strip() for _ in range(N)]
# strip()을 붙여주면 \n가 사라짐
# print(arr)

visited1 = [[False]*N for _ in range(N)]
visited2 = [[False]*N for _ in range(N)]

# cnt1: 적록색약이 아닐 경우
# cnt2: 적록색약일 경우
cnt1 = 0
cnt2 = 0
for r in range(N):
    for c in range(N):
        if not visited1[r][c]:
            cnt1 += 1
            RGB((r, c), arr[r][c])

        if not visited2[r][c]:
            cnt2 += 1
            GGB((r, c), arr[r][c])

print(f'{cnt1} {cnt2}')