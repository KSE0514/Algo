import sys
input = sys.stdin.readline

class S:
    def __init__(self):
        self.s = set()

    def cal_add(self, value):
        self.s.add(value)

    def cal_remove(self, value):
        self.s.discard(value)

    def cal_check(self, value):
        if value in self.s:
            print(1)
        else:
            print(0)

    def cal_toggle(self, value):
        if value in self.s:
            self.cal_remove(value)
        else:
            self.cal_add(value)

    def cal_all(self):
        self.s = set(i for i in range(1, 21))

    def cal_empty(self):
        self.s = set()

S = S()
M = int(input()) # 연산 횟수
for _ in range(M):
    cal_lst = input().split()
    cal = f'cal_{cal_lst[0]}'
    method = getattr(S, cal) # S 객체에서 cal_add, cal_remove 등의 메서드 가져오기
    if len(cal_lst) == 1:
        method()
    else:
        method(int(cal_lst[1]))