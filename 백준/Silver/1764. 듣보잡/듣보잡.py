N, M = map(int, input().split())

humans1 = set()
humans2 = set()

for _ in range(N):
    name = input()
    humans1.add(name)

for _ in range(M):
    name = input()
    humans2.add(name)

humans3 = list(humans1 & humans2)
humans3.sort()
print(len(humans3))
for name in humans3:
    print(name)