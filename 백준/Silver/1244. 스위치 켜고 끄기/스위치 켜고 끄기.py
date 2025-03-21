def m_do(n):
    k = 1
    while n*k <= N:
        lst[n*k] = (lst[n*k] + 1) % 2
        k += 1

def f_do(n):
    lst[n] = (lst[n] + 1) % 2
    st = n - 1
    ed = n + 1
    while 1<= st and ed <= N and lst[st] == lst[ed]:
        lst[st] = (lst[st] + 1) % 2
        lst[ed] = (lst[ed] + 1) % 2
        st -= 1
        ed += 1

N = int(input()) # 스위치 개수
lst = [0] + list(map(int, input().split())) # 스위치 상태
num = int(input()) # 학생 수

for _ in range(num):
    s, n = map(int, input().split()) # 성별, 받은 번호
    if s == 1: # 남학생이면
        m_do(n)
    else:
        f_do(n)

lst.pop(0)

cnt = 0
# lst.reverse()
for idx in range(0, len(lst), 20):
    print(*lst[idx:idx+20])