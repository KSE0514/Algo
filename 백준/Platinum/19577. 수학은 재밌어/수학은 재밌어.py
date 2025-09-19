import sys
input = sys.stdin.readline

n = int(input())

def phi(x):
    if x == 1:
        return 1
    i = 2
    result = x
    while i * i <= x: # x가 합성수일 경우 x의 가장 큰 소인수는 x^(1/2)보다 작거나 같음
        if x % i == 0: # x가 i로 나눠 떨어지면(즉 i가 x의 소인수이면)
            result -= result // i # 오일러 피 함수 계산
            while x % i == 0:
                x //= i
        if i == 2:
            i = 3
        else: # 소인수 중 짝수는 2밖에 없으므로 i가 2가 아닐 경우 2씩 건너뛰며 실행
            i += 2
    if x > 1: # x가 소수일 경우 자기 자신이 소인수
        result -= result // x

    return result

x = 1
answer = n + 1
while x <= n**(1/2):
    if n % x == 0:
        if x*phi(x) == n: # n의 약수 x 중, 조건을 만족하는 가장 작은 양의 정수 x를 출력
            print(x)
            exit()
        y = n // x
        if y*phi(y) == n:
            answer = min(answer, y)
    x += 1
# 조건을 만족하는 양의 정수가 없을 경우 -1 출력
if answer == n + 1:
    print(-1)
else:
    print(answer)