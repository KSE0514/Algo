S = input()
alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
         'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
         's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

for c in alpha:
    if c in S:
        print(S.index(c), end = ' ')
    else:
        print(-1, end = ' ')