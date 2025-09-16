import sys
input = sys.stdin.readline

N = int(input())
if N == 1:
    print(1)
    exit()

def gcd(x, y):
    while x % y != 0:
        r = x % y
        x = y
        y = r
    return y

MOD = 10**9 + 7
# 행렬식 채우기
D = [1] * (N+1)
D[2] = 2
for i in range(3, N + 1):
    D[i] = (D[i-1] + D[i-2]) % MOD
# N*N인 행렬 M에 대하여 1행에 대한 여인수 전개를 했을 시
# 1*D[N-1] + (-1) * ((-1)*D[N-2] + (뒤에 식이 더 있지만 결과적으로 0이 되므로 생략))라는 식이 나옴
# 즉, D[N] = D[N-1] + D[N-2]
# # 참고) 크기가 N*N인 행렬 A에 대하여 i행에 대한 여인수 전개: (-1)^(i+1)*a_11*A_11 + (-1)^(i+2)*a_12*A_12 + ... + (-1)^(i+N)*a_1N*A_1N

S = 0
for i in range(1, N + 1):
    S += D[gcd(i+1, N+1) - 1]
    S %= MOD
print(S)