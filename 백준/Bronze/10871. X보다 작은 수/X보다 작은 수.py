N, X = map(int, input().split())
lst = list(map(int, input().split()))

for num in lst:
    if num < X:
        print(num, end = " ")