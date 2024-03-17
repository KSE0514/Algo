N = int(input())
dic ={}
for _ in range(N):
    age, name = input().split()
    age = int(age)
    if age not in dic:
        dic[age] = []
    dic[age].append(name)

lst = list(dic)
lst.sort()
for age in lst:
    for name in dic[age]:
        print(f'{age} {name}')