lst = []
for _ in range(9):
    v = int(input())
    lst.append(v)

print(max(lst), lst.index(max(lst))+1)