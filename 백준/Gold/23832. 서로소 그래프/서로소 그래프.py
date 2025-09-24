import sys
input = sys.stdin.readline

def phi(x):
    result = x
    p = 2
    while p * p <= x:
        if x % p == 0:
            while x % p == 0:
                x //= p
            result -= result // p
        if p == 2:
            p = 3
        else:
            p += 2
    if x > 1:
        result -= result // x
    return result

N = int(input())
edge_cnt = 0
for n in range(N, 1, -1):
    edge_cnt += phi(n)
print(edge_cnt)