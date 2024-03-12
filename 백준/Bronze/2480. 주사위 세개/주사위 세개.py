lst = list(map(int, input().split()))

diff_check = len(set(lst))
if diff_check == 3:
    print(max(lst)*100)
elif diff_check == 1:
    print(10000+lst[0]*1000)
else:
    ST = []
    for num in lst:
        if num in ST:
            print(1000+num*100)
            break
        else:
            ST.append(num)