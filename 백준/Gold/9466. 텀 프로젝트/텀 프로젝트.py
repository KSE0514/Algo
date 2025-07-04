import sys
input = sys.stdin.readline
from collections import deque

def check_cycle(start):
    global cnt
    cur_student = start
    Q = deque([start])
    visited[start] = True
    while not visited[chooseList[cur_student]]:
        cur_student = chooseList[cur_student]
        Q.append(cur_student)
        visited[cur_student] = True

    # 사이클이 시작되는 학생 번호를 cycle_member의 초기값으로 지정
    cycle_member = chooseList[cur_student]
    while Q:
        studentNum = Q.popleft()
        # 사이클 시작 부분 찾기
        if studentNum == cycle_member:
            cnt += 1
            cycle_member = chooseList[cycle_member]

T = int(input()) # 테케 개수
for _ in range(T):
    n = int(input()) # 학생 수
    chooseList = [0] + list(map(int, input().split()))
    visited = [False] * (n+1)
    # print(chooseList)
    cnt = 0 # 팀이 이뤄진 학생 수를 계산

    # 자기 자신 지목한 학생들 먼저 처리
    for student in range(1, n+1):
        if chooseList[student] == student:
            cnt += 1
            visited[student] = True

    for student in range(1, n+1):
        if not visited[student]:
            check_cycle(student)

    print(n - cnt)