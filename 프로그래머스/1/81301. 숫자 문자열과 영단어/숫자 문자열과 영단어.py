num_dic = {
            "zero": "0",
            "one": "1",
            "two": "2",
            "three": "3",
            "four": "4",
            "five": "5",
            "six": "6",
            "seven": "7",
            "eight": "8",
            "nine": "9"
        }

def solution(s):
    result = s
    for key, value in num_dic.items():
        result = result.replace(key, value)
    return int(result)
    

# def solution(s):
#     if s.isdigit():
#         return int(s)
    
#     else:
#         num_dict = {
#             "zero": 0,
#             "one": 1,
#             "two": 2,
#             "three": 3,
#             "four": 4,
#             "five": 5,
#             "six": 6,
#             "seven": 7,
#             "eight": 8,
#             "nine": 9
#         }
#         result = '' # 숫자 변환 결과
#         mid_check = ''
#         for st in s:
#             if st.isdigit(): # 숫자이면
#                 result += st
#             else:
#                 mid_check += st
#                 if mid_check in num_dict:
#                     result += str(num_dict[mid_check]) # 만약 있으면 변환
#                     mid_check = '' # 다시 비워주기    
#         return int(result)