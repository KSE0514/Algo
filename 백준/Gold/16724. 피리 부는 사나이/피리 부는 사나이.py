import sys
input = sys.stdin.readline
from collections import deque

N, M = map(int, input().split()) # 행, 열
safe_cnt = 0
map = [list(input()) for _ in range(N)]
visited = [[False] * M for _ in range(N)]
arrow_dic = {'D': (1, 0), 'L': (0, -1), 'R': (0, 1), 'U': (-1, 0)}

def bfs(start):
    global safe_cnt
    Q = deque([start])
    flag = 0
    idx = -1
    while flag != 1:
        idx += 1
        curR, curC = Q[idx]
        if not visited[curR][curC]:
            visited[curR][curC] = True
            next_arrow = map[curR][curC] # 다음으로 이동해야하는 방향
            newR = curR + arrow_dic[next_arrow][0]
            newC = curC + arrow_dic[next_arrow][1]
            if 0 <= newR < N and 0 <= newC < M:
                # 만약 세이프존으로 이동하게 된다면 새롭게 세이프존을 만들 필요는 없음
                if map[newR][newC] == 'SAFE':
                    break
                # bfs를 도는 과정에서 방문했던 곳을 되돌아오면서 중간에 세이프존이 없었다면
                # -> 마지막 방문 지점(curR, curC)에 세이프존을 만들고 멈추기
                # 만약 전에 bfs를 돌며 방문했던 곳을 향하면
                # -> 세이프존 만들 필요없이 그대로 종료
                if visited[newR][newC]:
                    if (newR, newC) in Q:
                        map[curR][curC] = 'SAFE'
                        safe_cnt += 1
                    break
                else:
                    # 방문하지 않은 곳이라면 그대로 계속 이동
                    Q.append((newR, newC))


for r in range(N):
    for c in range(M):
        if not visited[r][c]:
            bfs((r, c))

print(safe_cnt)