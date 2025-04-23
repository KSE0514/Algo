import sys
input = sys.stdin.readline
from collections import deque

N, K = map(int, input().split()) # 수빈이 위치, 동생 위치

Q = deque()
visited = [False] * (10**5 + 1)
min_cnt = abs(N - K)  # 1칸씩 이동했을 경우 걸릴 시간을 초기값으로 넣기
if min_cnt == 0:
    print(min_cnt)
else:
    # 초기 Q 채워넣기
    if N > K:
        Q.append([N - 1, 1]) # [ 현재 위치, 누적 시간 ]
    else:
        for v in [2, 1, -1]:
            if v == 2:
                if N*v <= 10**5 and N*v <= K + (K - N):
                    Q.append([N*2, 1])
            else:
                if 0 <= N + v <= 10**5:
                    Q.append([N+v, 1])
    pastP = N
    while Q:
        curP, sumTime = Q.popleft() # 현재 위치, 현재 누적 시간
        if pastP != curP:
            visited[pastP] = True

        if curP == K and sumTime <= min_cnt: # 목적지에 도달했고, 최단 기록이면
            min_cnt = sumTime
            break

        else:
            if sumTime + 1 <= min_cnt:
                if curP > K:
                    if not visited[curP - 1]:
                        sumTime += 1
                        Q.append([curP - 1, sumTime])  # [ 현재 위치, 누적 시간 ]
                else:
                    sumTime += 1
                    for v in [2, 1, -1]:
                        if v == 2:
                            if curP * v <= 10 ** 5 and curP * v <= K + (K - curP) and not visited[curP * v]:
                                Q.append([curP * 2, sumTime])
                        else:
                            if 0 <= curP + v <= 10 ** 5 and not visited[curP + v]:
                                Q.append([curP + v, sumTime])
            pastP = curP

    print(min_cnt)