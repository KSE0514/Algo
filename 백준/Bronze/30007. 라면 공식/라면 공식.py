T = int(input())
for _ in range(T):
    A, B, X = map(int, input().split())
    W = A*(X-1) + B
    print(W)