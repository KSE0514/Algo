import sys
import heapq
input = sys.stdin.readline

def bfs():
    hq = []
    heapq.heappush(hq, (0, 0, 0))
    visited = [[False] * n for _ in range(n)]
    visited[0][0] = True
    while hq:
        curD, curR, curC = heapq.heappop(hq) # 흰 방으로 바꾼 수, 현재 행, 현재 열
        if (curR, curC) == (n-1, n-1):
            return curD

        for r, c in [(1, 0), (0, 1), (-1, 0), (0, -1)]:
            newR = curR + r
            newC = curC + c
            if 0 <= newR < n and 0 <= newC < n and not visited[newR][newC]:
                visited[newR][newC] = True
                if arr[newR][newC] == 0:
                    heapq.heappush(hq, (curD + 1, newR, newC))
                else:
                    heapq.heappush(hq, (curD, newR, newC))

n = int(input())
arr = [list(map(int, input().strip())) for _ in range(n)]

print(bfs())