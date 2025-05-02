import sys
input = sys.stdin.readline

A, B, C = map(int, input().split())

def mul(n):
    global A, B, C
    if n == 1:
        return A % C
    else:
        m = mul(n//2)
        if n % 2: # 홀수
            return (m*m*(A % C)) % C
        else:
            return (m*m) % C
print(mul(B))