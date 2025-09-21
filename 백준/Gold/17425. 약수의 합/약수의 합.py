import sys
input = sys.stdin.readline

f = [0] * (10**6 + 1)
g = [0] * (10**6 + 1)

for d in range(1, 10**6 + 1):
    for multi in range(d, 10**6 + 1, d):
        f[multi] += d

for i in range(1, 10**6 + 1):
    g[i] = g[i-1] + f[i]

T = int(input())
for _ in range(T):
    N = int(input())
    print(g[N])