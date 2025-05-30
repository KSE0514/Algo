import sys
import math
input = sys.stdin.readline

T = int(input())

for _ in range(T):
    M, N, x, y = map(int, input().split())

    for m in range(0, math.lcm(M, N) + 1, M):
        if (m + x) % N == y or (y == N and not (m + x) % N):
            print(m + x)
            break
    else:
        print(-1)