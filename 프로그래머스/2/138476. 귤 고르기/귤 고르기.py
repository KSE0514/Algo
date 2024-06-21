def solution(k, tangerine):
    # 카운팅배열 이용
    cntarr = [0] * (max(tangerine)+1)
    for idx in range(len(tangerine)):
        cntarr[tangerine[idx]] += 1
    # cntarr의 i번째 인덱스에는 크기가 i인 귤의 개수가 담겨있음
    cntarr.sort()
    cntarr.reverse()
    sumV = 0
    i = 0
    while sumV < k:
        sumV += cntarr[i]
        i += 1
    answer = i
    return answer