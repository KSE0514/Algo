N = int(input()) # 과목 수
lst = list(map(int, input().split()))
print((sum(lst)/max(lst)*100/N))