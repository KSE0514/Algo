import sys
input = sys.stdin.readline

def complete(num, cnt):
    global min_cnt
    # 백트래킹
    if cnt >= min_cnt: # 계산중에 최소횟수를 넘어서면 백트래킹
        return

    if num == 1:
        if cnt < min_cnt:
            min_cnt = cnt
        return

    if num % 3 == 0:
        complete(num // 3, cnt + 1)

    if num % 2 == 0:
        complete(num // 2, cnt + 1)

    complete(num-1, cnt + 1)



N = int(input())
if N == 1:
    print(0)
else:
    min_cnt = 10**6
    complete(N, 0)
    print(min_cnt)