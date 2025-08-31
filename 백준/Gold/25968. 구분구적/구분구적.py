import sys
input = sys.stdin.readline

n = int(input())
coefficient = list(map(float, input().split()))
k = int(input())

def q(t):
    y = 0
    for coef in coefficient:
        y = y*t + coef
    return y

def bisection(f, a, b, tol=1e-7): # 파이썬의 brentq를 대신할 함수
    fa, fb = f(a), f(b)
    if fa * fb > 0:
        return None  # 부호 변화 없으면 근 없음
    while (b - a) > tol:
        mid = (a + b) / 2
        fm = f(mid)
        if fa * fm <= 0:
            b, fb = mid, fm
        else:
            a, fa = mid, fm
    return (a + b) / 2

# 해 구하기
roots = []
for a in range(0, 1025): # [0, 1024] 범위를 1씩 나눠 스캔
    b = a + 1
    if q(a) == 0:
        roots.append(a)
    elif q(b) == 0:
        roots.append(b)
    elif q(a)*q(b) < 0: # 부호가 바뀌면 사이에 근 존재(사잇값 정리)
        r = bisection(q, a, b)
        roots.append(r)

    if roots:
        t = roots.pop()
        x = t**(1/2)
        roots.append(-x)
        roots.append(x)
        break

# 구분구적법
dx = (roots[1] - roots[0]) / k
sumV = 0
for i in range(k):
    c = roots[0] + dx*i # 시작
    d = c + dx # 끝
    e = (c+d) / 2 # 중간값
    h = q(e**2) # 높이
    sumV += dx * h
print(round(abs(sumV), 4))