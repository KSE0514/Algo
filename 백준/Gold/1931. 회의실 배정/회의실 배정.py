import sys
input = sys.stdin.readline

N = int(input())
schedule = []
for _ in range(N):
    s, e = map(int, input().split())
    schedule.append((s, e))
schedule = sorted(schedule, key = lambda x : (x[1], x[0])) # 끝나는 시간 기준으로 오름차순 정렬, 끝나는 시간이 같을 경우 시작 시간 오름차순

cnt = 0
end_time = 0 # 이전 회의 끝나는 시간 저장
for st, ed in schedule:
    if st >= end_time:
        cnt += 1
        end_time = ed
print(cnt)