import sys
input = sys.stdin.readline
import heapq

N = int(input())
heap = []
for _ in range(N):
    x = int(input())
    if x != 0:
        heapq.heappush(heap, (abs(x), x))
    else:
        if heap:
            abs_x, ori_x = heapq.heappop(heap)
            print(ori_x)
        else:
            print(0)