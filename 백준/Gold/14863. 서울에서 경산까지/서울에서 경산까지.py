import sys
input = sys.stdin.readline

N, K = map(int, input().split())
pre_dp = [-1] * (K+1)
pre_dp[0] = 0

for _ in range(N):
    time_mon_list = list(map(int, input().split())) # [도보 시간, 도보 모금액, 자전거 시간, 자전거 모금액]
    cur_dp = [-1] * (K+1)

    # 도보와 자전거 각각의 방법에서의 최대 모금액 계산하기
    for i in range(2):
        time = time_mon_list[i*2]
        money = time_mon_list[i*2 + 1]
        for t in range(K-time+1):
            if pre_dp[t] != -1:
                cur_dp[t + time] = max(cur_dp[t + time], pre_dp[t] + money)
            
    # 이전까지의 최고 누적 금액 업데이트
    pre_dp = [*cur_dp]

print(max(pre_dp))