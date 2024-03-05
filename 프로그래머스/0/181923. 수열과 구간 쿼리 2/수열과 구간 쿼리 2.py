def solution(arr, queries):
    answer = []
    for i in range(len(queries)):
        num = []
        for j in range(queries[i][0], queries[i][1]+1):
            if arr[j] > queries[i][2]:
                num.append(arr[j])
        if len(num) == 0:
            answer.append(-1)
        else:
            answer.append(min(num))
    return answer