def solution(board, moves): # 보드 상태, 크레인 작동 위치(인덱스 +1)
    bord_size = len(board[0])
    ST = []
    cnt_result = 0
    
    for c in moves:
        col = c-1 # 크레인 작동 열
        for row in range(0, bord_size):
            if board[row][col] != 0: # 인형이 있다면
                # 스택에 넣기 전 맨 위의 인형과 비교
                if ST: # 스택이 비어있지 않다면
                    top = ST.pop()
                    if top == board[row][col]: # 같다면
                        cnt_result += 2 # 2개씩 터지므로 2개 카운트 업
                    else:
                        ST.append(top)
                        ST.append(board[row][col])
                else: # 비어있다면
                    ST.append(board[row][col])
                board[row][col] = 0 # 인형을 꺼냈으므로 0으로 바꿔주기
                break
        
    
    return cnt_result