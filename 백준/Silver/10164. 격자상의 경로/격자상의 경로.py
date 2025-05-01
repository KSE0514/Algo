import sys
input = sys.stdin.readline

def factorial(n):
    if n <= 1:
        return 1
    else:
        return n * factorial(n-1)

N, M, K = map(int, input().split()) # 행 열 동그라미
if K == 0:
    print(factorial(N+M-2)//(factorial(N-1)*factorial(M-1)))
else:
    if K % M == 0:
        K_r = K // M - 1
        K_c = M - 1
    else:
        K_r = K // M
        K_c = K % M -1 # K의 열(이면서 첫 번째 구간에서 이동해야 할 가로 칸 수)

    area1 = factorial(K_r + K_c) // (factorial(K_r)*factorial(K_c))

    K_r2 = N-1 - K_r # 두 번째 구간에서 이동해야 할 세로 칸 수
    K_c2 = M-1 - K_c # 두 번째 구간에서 이동해야 할 가로 칸 수
    area2 = factorial(K_r2 + K_c2) // (factorial(K_r2)*factorial(K_c2))

    print(area1*area2)