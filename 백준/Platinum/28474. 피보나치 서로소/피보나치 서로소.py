import sys
input = sys.stdin.readline

def phi(x): # 오일러 피 함수_x이하의 자연수 중 x와 서로소인 수의 개수
    result = x
    d = 2
    while d * d <= x:
        if x % d == 0:
            while x % d == 0:
                x //= d
            result -= result // d
        if d == 2:
            d = 3
        else:
            d += 2
    if x > 1:
        result -= result // x
    return result

T = int(input())
for _ in range(T):
    n = int(input())
    if n == 1 or n == 2:
        print(n-1)
    else:
        # <설명>
        # gcd(F(m), F(n)) = F(gcd(m, n)), (이때 F(n)은 n번째 피보나치 수)
        # 즉 'gcd(F(m), F(n)) = 1 이다' === 'F(gcd(m, n)) = 1이다'
        # 이때 피보나치 수열의 값이 1인 것은 F(1)과 F(2)밖에 없음 => gcd(m, n) = 1 이거나 gcd(m, n) = 2인 n미만의 자연수 m의 개수를 세어주면 됨
        # ## n이 홀수일 경우엔 최대공약수가 2가 될 수 없으니 gcd(m, n) = 1을 만족하는 m의 개수만 생각해주면 되고
        # ## n이 짝수일 경우엔 gcd(m, n) = 1을 만족하거나 gcd(m, n) = 2를 만족하는 m의 개수를 생각해줘야 함
        
        # # 오일러 피 함수
        # ## phi(n): n이하의 자연수 중 n과 서로소인 수의 개수
        # ## phi(n//2): n이하의 자연수 중 최대공약수가 2인 수의 개수
        if n % 2 == 0:
            print(phi(n) + phi(n//2))
        else:
            print(phi(n))