lst = []
for _ in range(10):
    v = int(input())
    lst.append(v%42)
lst = set(lst)
print(len(lst))