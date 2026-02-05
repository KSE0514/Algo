import sys
input = sys.stdin.readline

N, M = map(int, input().split())
A = list(map(int, input().split()))
B = A + list(map(int, input().split()))
B.sort()
print(*B)