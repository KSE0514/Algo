import sys
input = sys.stdin.readline
import heapq

def find_k(st):
    global N, K, min_cnt
    Q = st
    
    while Q:
        cnt, X = heapq.heappop(Q)

        if X == K and cnt <= min_cnt:
            min_cnt = cnt
            return

        if not visited[X]:
            visited[X] = True
            if X > K:
                heapq.heappush(Q, (cnt+1, X-1))
            else:
                if 2*X <= (10**5):
                    if 2*X <= (2*K - N):
                        heapq.heappush(Q, (cnt, 2*X))
                if X+1 <= (10 ** 5):
                    heapq.heappush(Q, (cnt+1, X+1))
                if X-1 >= 0:
                    heapq.heappush(Q, (cnt+1, X-1))

N, K = map(int, input().split()) # 수빈 위치, 동생 위치

min_cnt = abs(N-K)
visited = [False] * (10**5 + 1)
start = []
if N == K:
    print(0)
else:
    if N > K:
        heapq.heappush(start, (1, N-1))
    else:
        if 2*N <= (2*K - N):
            heapq.heappush(start, (0, 2*N))
        if 0 <= N + 1 <= (10 ** 5):
            heapq.heappush(start, (1, N + 1))
        if 0 <= N - 1 <= (10 ** 5):
            heapq.heappush(start, (1, N - 1))
    find_k(start)
    print(min_cnt)