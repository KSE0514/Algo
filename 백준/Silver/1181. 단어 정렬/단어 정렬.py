import sys
input = sys.stdin.readline

N = int(input())
array = [[] for _ in range(51)]
idx_array = []
for _ in range(N):
    word = input().strip()
    word_len = len(word)
    if word not in array[word_len]:
        array[word_len].append(word)

    if word_len not in idx_array:
        idx_array.append(word_len)

idx_array.sort()
for idx in idx_array:
    array[idx].sort()
    for w in array[idx]:
        print(w)