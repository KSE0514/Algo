import sys
input = sys.stdin.readline

N, M = map(int, input().split())
cards = list(map(int, input().split()))

result = 0
def comp():
    global result, cards, M, N
    for i in range(0, N-2):
        if cards[i] >= M:
            pass
        for j in range(i+1, N-1):
            if cards[i]+cards[j] >= M:
                pass
            for k in range(j+1, N):
                sumV = cards[i] + cards[j] + cards[k]
                if sumV <= M and abs(M - sumV) < abs(M - result):
                    result = sumV
                    if result == M:
                        return
    return

comp()
print(result)