import sys
input = sys.stdin.readline

laser_info = list(input().strip())
laser_len = len(laser_info)

rod_sum = 0 # 쇠막대 누적 합
iron_rod = 0 # 아직 잘리는 중인 쇠막대
for idx in range(0, laser_len-1):
    if laser_info[idx] == '(':
        # 레이저라면 => 쇠막대 누적합 += 현재 잘리는중인 쇠막대의 수
        if laser_info[idx+1] == ')':
            rod_sum += iron_rod
        # 만약 쇠막대라면
        else:
            rod_sum += 1
            iron_rod += 1
    else:
        if laser_info[idx-1] != '(': # 막대가 끝나는 경우(레이저가 아닌 경우)
            iron_rod -= 1

print(rod_sum)
