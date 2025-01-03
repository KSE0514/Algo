def solution(survey, choices):
    survey_cnt_dic = {
        "R" : 0,
        "T" : 0,
        "C" : 0,
        "F" : 0,
        "J" : 0,
        "M" : 0,
        "A" : 0,
        "N" : 0
    }
    
    # 설문 결과 집계
    idx = 0
    for point in choices:
        if point < 4: # 비동의 쪽이면
            survey_cnt_dic[survey[idx][0]] += 4 - point
        elif point > 4: # 동의 쪽이면
            survey_cnt_dic[survey[idx][1]] += point - 4
        idx += 1
        
    # 결과
    cartegory = ['RT', 'CF', 'JM', 'AN']
    result = ''
    
    for ca in cartegory:
        if survey_cnt_dic[ca[0]] > survey_cnt_dic[ca[1]]:
            result += ca[0]
        elif survey_cnt_dic[ca[0]] < survey_cnt_dic[ca[1]]:
            result += ca[1]
        else:
            result += ca[0]
    return result