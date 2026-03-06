import sys
input = sys.stdin.readline

T = int(input())
for tc in range(T):
    A, B = map(int, input().split())
    print(f"Case #{tc+1}: {A} + {B} = {A+B}")