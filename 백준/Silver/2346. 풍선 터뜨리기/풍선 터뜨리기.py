import sys
input = sys.stdin.readline

N = int(input())
balloon = list(map(int, input().split()))

idx = 0
pop_log = [1]
while len(pop_log) < N:
    value = balloon[idx] # 현재 종이에 적혀있는 값
    balloon[idx] = 0 # 방문 표시
    
    v = abs(value) # 남은 이동 횟수
    d = value // v # 방향
    while v:
        idx += d # 한칸 이동
        
        # 인덱스 범위를 벗어날 경우 재조정
        if idx < 0:
            idx += N
        elif idx >= N:
            idx %= N
        
        # 이미 터진 풍선일 경우 다시 이동
        if balloon[idx] == 0:
            continue
            
        v -= 1 # 안 터진 풍선일 경우에만 이동으로 판정
    pop_log.append(idx+1) # 최종 이동 후 터뜨릴 풍선 번호

print(*pop_log)