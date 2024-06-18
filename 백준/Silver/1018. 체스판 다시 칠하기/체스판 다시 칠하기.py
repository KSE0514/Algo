import sys
input = sys.stdin.readline

N, M = map(int, input().split())
arr = [input().strip() for _ in range(N)]

# print(arr)
minV = 64
# 기준점을 바꾸며 8*8사이즈로 자르기
for i in range(N-7):
    for j in range(M-7):
        change1 = 0 # (0,0)이 흰색으로 시작하려 하는 체스판을 만들려 할 때 바꿔야 할 칸 수 카운트
        change2 = 0 # (0,0)이 검은색으로 시작하려 하는 체스판을 만들려 할 때 바꿔야 할 칸 수 카운트
        for row in range(i, i+8, 2):
            for col in range(j, j+8, 2):
                # (0,0)이 흰색으로 시작하려 하는 체스판을 만들려 할 때
                # 2*2 배열의 색 패턴이 일치한지 비교(if는 2사분면이 흰색으로 시작할 때, else는 검은색일 때)
                if arr[row][col] != "W": # 짝수인덱스 행의 짝수인덱스번째 열이 하얀색이 아니면
                    change1 += 1
                else: # 2사분면이 검은색이 아닐 때
                    change2 += 1

                if arr[row][col+1] != "B": # 짝수행의 홀수번째 열이 검은색이 아니면
                    change1 += 1
                else: # 1사분면이 흰색이 아닐 때
                    change2 += 1

                if arr[row+1][col] != "B": # 홀수 인덱스 행의 짝수인덱스 번째 열이 검정색이 아니면
                    change1 += 1
                else: # 3사분면이 흰색이 아닐 때
                    change2 += 1

                if arr[row+1][col+1] != "W": # 홀수 인덱스 행의 홀수 인덱스 열이 흰색이 아니면
                    change1 += 1
                else: # 4사분면이 검은색이 아닐 때
                    change2 += 1

        midMinV = min(change1, change2)

        # 최솟값 비교
        if minV > midMinV:
            minV = midMinV

print(minV)