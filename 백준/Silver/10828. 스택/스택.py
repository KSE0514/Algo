from collections import deque
import sys
input = sys.stdin.readline

def St(c):
    global cnt

    if c == 'size':
        print(cnt)

    elif c == 'empty':
        if ST:
            print(0)
        else:
            print(1)

    else:
        if (c == 'pop' or c == 'top') and ST:
            if c == 'pop':
                print(ST.pop())
                cnt -= 1
            else:
                print(ST[-1])
        else:
            print(-1)

N = int(input())
ST = []
cnt = 0
for _ in range(N):
    inList = deque(input().split())
    if inList[0] == 'push': # push일 경우
        ST.append(inList[1])
        cnt += 1
    else:
        St(*inList)