def f(n): # n!
    if n <= 1:
        return 1
    else:
        return n*f(n-1)

def C(n, k): # nCk
    return f(n)//(f(k)*f(n-k))

n, k = map(int, input().split())
print(C(n, k))