import sys
input = sys.stdin.readline


s = input().strip().upper()
dic = {}

for alpa in s:
    if alpa in dic:
        dic[alpa] += 1
    else:
        dic[alpa] = 1

# 리스트 컴프리헨션 _ 최대값이 여러 개일 때 그에 대응되는 key 값들을 전부 요소로 담은 리스트
tmp = [k for k,v in dic.items() if max(dic.values()) == v]

if len(tmp) > 1:
    print('?')
else:
    print(*tmp)