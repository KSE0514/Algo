# 6:32~40
def solution(s):
    ST = [s[0]]
    for c in s[1:]:
        if ST and ST[-1] == c:
            ST.pop()
        else:
            ST.append(c)
    if ST:
        answer = 0
    else:
        answer = 1

    return answer