import sys
input = sys.stdin.readline
from collections import deque

T = int(input())

for _ in range(T):
    p = input().strip()
    n = int(input())
    num_string = input().strip()
    if num_string != '[]':
        num_string = num_string[1:-1].split(',')
    num_arr = []
    for s in num_string:
        if s != '' and s != '[' and s != ']':
            num_arr.append(s)
    Q = deque(num_arr)
    if p.count('D') > len(num_arr):
        print('error')
    else:
        if len(Q):
            reverse_flag = 1 # 1: 원래 방향, -1: 뒤집기
            for order in p:
                if order == 'R':
                    reverse_flag *= -1
                else:
                    if reverse_flag == 1:
                        Q.popleft()
                    else:
                        Q.pop()

            if reverse_flag == 1:
                result = ",".join(Q)
            else:
                Q.reverse()
                result = ",".join(Q)
            print(f'[{result}]')
        else:
            print("[]")