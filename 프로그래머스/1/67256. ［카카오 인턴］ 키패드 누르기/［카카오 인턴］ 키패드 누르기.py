def solution(numbers, hand):
    right = (3, 2) # 오른엄지 초기 좌표
    left = (3, 0) # 왼엄지 초기 좌표
    
    result = '' # 결과
    
    for num in numbers:      
        if num == 0:
            num_rc = (3, 1)
        else:
            num_rc = ((num-1) // 3, (num -1) % 3) # 숫자의 좌표
            
        if num in [1, 4, 7]:
            result += "L" # 왼엄지로 누름
            left = num_rc # 왼엄지 좌표 재설정
        elif num in [3, 6, 9]:
            result += "R" # 오른 엄지로 누름
            right = num_rc # 오른엄지 좌표 재설정
        else: # 왼엄지, 오른엄지 거리 계산 해줘야 함
            r_len = abs(right[0] - num_rc[0]) + abs(right[1] - num_rc[1]) # 오른엄지 거리
            l_len = abs(left[0] - num_rc[0]) + abs(left[1] - num_rc[1]) # 왼엄지 거리
            if r_len < l_len:
                result += "R"
                right = num_rc
            elif l_len < r_len:
                result += "L"
                left = num_rc
            else:
                if hand == "right":
                    result += "R"
                    right = num_rc
                else:
                    result += "L"
                    left = num_rc
    return result