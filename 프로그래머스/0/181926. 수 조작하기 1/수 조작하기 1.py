def solution(n, control):
    for a in control:
        if a == 'w':
            n += 1
        elif a == 's':
            n -= 1
        elif a == 'd':
            n += 10
        else:
            n -= 10
    return n