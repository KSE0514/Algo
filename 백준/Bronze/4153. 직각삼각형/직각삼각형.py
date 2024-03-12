while True:
    lst = list(map(int, input().split()))
    if lst == [0, 0, 0]:
        break
    else:
        c = max(lst)
        lst.remove(c)
        if c**2 == lst[0]**2 + lst[1]**2:
            print('right')
        else:
            print('wrong')