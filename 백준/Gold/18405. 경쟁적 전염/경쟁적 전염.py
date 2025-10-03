import sys
import heapq
input = sys.stdin.readline

def bfs(hq):
    for _ in range(S):
        temp_hq = []
        while hq:
            virus_num, curR, curC = heapq.heappop(hq)
            for r, c in [(1, 0), (0, 1), (-1, 0), (0, -1)]:
                newR = curR + r
                newC = curC + c
                if 0 <= newR < N and 0 <= newC < N and arr[newR][newC] == 0:
                    arr[newR][newC] = virus_num
                    heapq.heappush(temp_hq, (virus_num, newR, newC))
        hq = temp_hq
    return arr[X][Y]


N, K = map(int, input().split())
arr = [list(map(int, input().split())) for _ in range(N)]
S, X, Y = map(int, input().split()) # 종료 시간, (바이러스 종류를 출력할 좌표의) 행, 열

# 좌표 보정
X -= 1
Y -= 1

hq = []
# 초기 바이러스 정보 hq에 담기
for r in range(N):
    for c in range(N):
        if arr[r][c] != 0:
            heapq.heappush(hq, (arr[r][c], r, c))

print(bfs(hq))