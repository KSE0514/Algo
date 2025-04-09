import sys
input = sys.stdin.readline

T = int(input())

for _ in range(T):
    lst = list(map(int, input().split()))
    sumV = 0
    sort_list = [lst[1]]
    for idx in range(2, 21):
        for st_idx, student in enumerate(sort_list):
            if lst[idx] < student:
                sumV += len(sort_list) - st_idx
                break
        sort_list.append(lst[idx]) # 학생 추가하고
        sort_list.sort() # 오름차순 정렬
    print(lst[0], sumV)