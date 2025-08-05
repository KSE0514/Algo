import sys
input = sys.stdin.readline
import heapq

N, M = map(int, input().split())
G = [[] for _ in range(N+1)] # 방향그래프
indegree = [0] * (N+1) # 전입차수
for _ in range(M):
    A, B = map(int, input().split())
    G[A].append(B)
    indegree[B] += 1

# 전입차수가 0인 문제들 전부 담기(문제 번호가 낮은 것부터 풀기 위해 힙큐로 구현)
hq = []
for i in range(1, N+1):
    if indegree[i] == 0:
        heapq.heappush(hq, i)

result = []
while hq:
    n = heapq.heappop(hq) # 풀 수 있는 문제 중 가장 쉬운 문제(숫자가 낮은 문제)부터 풀기
    result.append(n)
    # n번 문제와 연결된 간선 제거 후, 풀 수 있는 문제 hq에 담기
    for nxt in G[n]:
        indegree[nxt] -= 1
        if indegree[nxt] == 0:
            heapq.heappush(hq, nxt)

print(*result)