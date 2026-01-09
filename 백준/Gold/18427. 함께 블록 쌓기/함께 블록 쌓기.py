import sys
input = sys.stdin.readline

MOD = 10007

N, M, H = map(int, input().split()) # 학생 수, 학생이 가지고 있는 최대 블록 개수, 만들 탑의 높이
pre_dp = [0] * (H+1) # idx높이까지 쌓을 수 있는 방법의 수
cur_dp = [0] * (H+1)
for _ in range(N):
    b_list = list(map(int, input().split())) # 학생이 가지고 있는 블록 리스트
    pre_dp[0] = 1
    for b in b_list:
        for h in range(H, b-1, -1):
            cur_dp[h] += pre_dp[h-b]
    pre_dp = [*cur_dp]

print(pre_dp[H]%MOD)