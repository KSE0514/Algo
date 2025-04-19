import sys
input = sys.stdin.readline

N = int(input())
numList = list(map(int, input().split()))
sortList = list(set(numList))
sortList.sort()

idxDic = {}
idx = 0
for v in sortList:
    # print(v, idx)
    idxDic[v] = idx
    idx += 1

result = []
for v in numList:
    result.append(idxDic[v])
print(*result)
