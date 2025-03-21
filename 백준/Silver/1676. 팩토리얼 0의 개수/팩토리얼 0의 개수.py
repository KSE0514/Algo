def f(n):
    if n <= 1:
        return 1
    else:
        return n*f(n-1)

N = int(input())
s = str(f(N))
lst = list(s)
lst.reverse()
cnt = 0
for i in lst:
    if i == '0':
        cnt += 1
    else:
        break
print(cnt)