import sys
input = sys.stdin.readline

N, M = map(int, input().split()) # 나무 수, 가져가려는 나무 길이
Trees = list(map(int, input().split()))

Trees = [0] + sorted(Trees, key = lambda x : -x) # 내림차순 정렬

past_cut_height = Trees[1]
sumV = 0
flag = 0
for n in range(1, N+1):
    if n < N:
        next_cut_height = Trees[n+1]
    elif n == N:
        next_cut_height = 0
    sumV += n * (Trees[n] - next_cut_height) # (현재 나무를 포함한 이전 나무들 개수) * (현재 나무와 다음 나무의 차)에 대한 누적 합
    if M < sumV:
        # 지금 커트 라인이 넉넉한 경우, past_cut_height 전까지 자를 높이 점점 올리기
        # 누적합이 M보다 작아지기 전까지 커트라인 점점 높이기
        for plus_cut in range(1, past_cut_height-next_cut_height + 1):
            if sumV - n * plus_cut <= M: # 만약 M보다 작아졌다면 바로 직전 plus_cut값이 적절한 값
                if sumV - n * plus_cut == M:
                    print(next_cut_height + plus_cut)
                else:
                    print(next_cut_height + plus_cut - 1)
                flag = 1
                break

    elif M == sumV:
        print(next_cut_height)
        flag = 1

    if flag:
        break
    else:
        # 더 필요하다면 다음 나무로 넘어가기(이전 나무 높이 갱신)
        past_cut_height = next_cut_height