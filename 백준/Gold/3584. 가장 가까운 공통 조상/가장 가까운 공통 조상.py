import sys
input = sys.stdin.readline

def find_parents(start):
    parents_list = []
    while start != -1:
        parents_list.append(start)
        start = parent[start]
    parents_list.reverse()
    return parents_list


T = int(input())

for _ in range(T):
    N = int(input()) # 트리를 구성하는 노드의 수
    indegree = [0] * (N+1)
    parent = [-1] * (N+1)
    for _ in range(N-1):
        A, B = map(int, input().split()) # A가 B의 부모
        parent[B] = A
    root = indegree.index(0, 1) # 최상위 루트노드

    n1, n2 = map(int, input().split()) # 공통 조상을 구할 두 노드
    n1_parents = find_parents(n1) # n1의 조상들
    n2_parents = find_parents(n2) # n2의 조상들
    
    # 깊이가 가장 깊은 공통 조상 찾기
    min_len = min(len(n1_parents), len(n2_parents))
    common = root
    for i in range(min_len):
        if n1_parents[i] == n2_parents[i]:
            common = n1_parents[i]
        else:
            break
    
    # 출력
    print(common)