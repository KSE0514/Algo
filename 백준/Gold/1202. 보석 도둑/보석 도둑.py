import sys
input = sys.stdin.readline
import heapq

N, K = map(int, input().split()) # 보석 개수, 가방 개수
gems = []
bags = []
for _ in range(N):
    M, V = map(int, input().split()) # 보석 무게, 보석 가격
    gems.append((M, V))
for _ in range(K):
    b = int(input())
    bags.append(b)
gems.sort()
bags.sort()

max_sumV = 0
gem_idx = 0
hq = []
# 담을 수 있는 무게가 적은 가방부터 차례대로 보석 담기
for bag in bags:
    # 담을 수 있는 보석 후보들 hq에 채우기
    while gem_idx < N and gems[gem_idx][0] <= bag:
        heapq.heappush(hq, -gems[gem_idx][1])
        gem_idx += 1

    # 현재 가방에 담을 수 있는 보석이 있다면 보석 담기 
    if len(hq) > 0:
        max_sumV += abs(heapq.heappop(hq))
print(max_sumV)