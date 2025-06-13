import sys
input = sys.stdin.readline
import heapq

def prim(start):
    hq = []
    heapq.heappush(hq, (0, start))
    while hq:
        # [방문 한 노드] - [방문 안 한 노드] 간선 가중치 중 가장 낮은 것을 선택하기 위해
        # weight가 낮은 것을 우선으로 꺼내되,
        weight, node = heapq.heappop(hq)
        # 방문 안 한 점에 대해서만 방문하기
        if not visited[node]:
            visited[node] = True
            weightList.append(weight)

            # 맨 처음 시작할 때 0이라는 가중치 값도 담기므로 N-1개의 간선을 선택한 뒤엔 길이가 N이 됨
            if len(weightList) == N:
                break
            
            # [방문 한 노드] - [방문 안 한 노드] 간선 후보들을 hq에 담기
            for nodeInfo in G[node]:
                heapq.heappush(hq, nodeInfo)

    return sum(weightList) - max(weightList)


N, M = map(int, input().split()) # 집 개수, 길 개수
G = [[] for _ in range(N+1)] # 연결 정보
visited = [False] * (N+1)
weightList = [] # 선택된 간선의 값을 담을 변수
for _ in range(M):
    a, b, c = map(int, input().split()) # 집1, 집2, 연결 유지비
    G[a].append((c, b))
    G[b].append((c, a))

print(prim(1))