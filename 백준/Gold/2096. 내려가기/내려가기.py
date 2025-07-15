import sys
input = sys.stdin.readline

N = int(input())

max_before = list(map(int, input().split()))
min_before = [*max_before]

for _ in range(N-1):
    v0, v1, v2 = map(int, input().split())
    max_cur = [
        max(max_before[0], max_before[1]) + v0,
        max(max_before[0], max_before[1], max_before[2]) + v1,
        max(max_before[1], max_before[2]) + v2
    ]
    min_cur = [
        min(min_before[0], min_before[1]) + v0,
        min(min_before[0], min_before[1], min_before[2]) + v1,
        min(min_before[1], min_before[2]) + v2
    ]
    max_before = [*max_cur]
    min_before = [*min_cur]

print(max(max_before), min(min_before))