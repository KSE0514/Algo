import sys
input = sys.stdin.readline


# 팩토리얼
def P(n):
    if n <= 1:
        return 1
    return n*P(n-1)

# 조합
def Comb(n, r):
    return P(n)//(P(r)*P(n-r))

N, M, K = map(int, input().split())

# K번째 칸이 몇행(K//M) 몇열(K%M - 1)인지

if K == 0:
    # (0, 0)부터 (N-1, M-1)까지 가는 최단경로
    result = Comb((N-1) + (M -1)  , M -1 )

else:
    # (0, 0)부터 (K//M, K%M -1)을 거쳐서 (N-1, M-1)까지 가는 최단경로
    midPointRow = K//M
    midPointCol = K%M - 1
    result = Comb(midPointRow + midPointCol, midPointCol) * Comb(N-1 - midPointRow + M - 1 - midPointCol, M - 1 - midPointCol)

print(result)


