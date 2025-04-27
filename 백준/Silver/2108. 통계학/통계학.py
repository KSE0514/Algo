import sys
input = sys.stdin.readline
from collections import Counter

N = int(input())
num_list = []
for _ in range(N):
    n = int(input())
    num_list.append(n)

num_list.sort() # 오름차순 정렬
m_idx = N//2
mode = Counter(num_list).most_common()
mode_value = 0
if len(mode) >= 2 and mode[0][1] == mode[1][1]:
    mode_value = mode[1][0]
else:
    mode_value = mode[0][0]
print(round(sum(num_list)/N)) # 평균
print(num_list[m_idx]) # 중앙값
print(mode_value) # 최빈값
print(max(num_list) - min(num_list)) # 최댓값 - 최솟값