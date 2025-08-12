const fs = require('fs')
var [[N, M], ...list] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./2623input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

class Q {
  constructor() {
    this.queue = []
    this.head = 0
  }

  enqueue(value) {
    this.queue.push(value)
  }

  dequeue() {
    return this.queue[this.head++]
  }

  isEmpty() {
    return this.queue.length === this.head
  }
}

const G = Array.from({length: N + 1}, () => []) // 방향 그래프
const Indegree = Array.from({length: N+1}, () => 0) // 전입차수

// 전입차수 및 그래프 채우기
list.forEach(li => {
  const num = li[0]
  for (let i = 1; i <= num - 1; i++) {
    const n1 = li[i], n2 = li[i+1]
    if (!G[n1].includes(n2)) { // 중복 간선이 들어오는 경우 존재
      G[n1].push(n2)
      Indegree[n2] += 1 
    }
  }
})

// 1. 전입차수가 0인 것들 dq에 담기
const dq = new Q()
for (let i = 1; i <= N; i++) {
  if (Indegree[i] === 0) {
    dq.enqueue(i)
  }
}

const result = []
// 2. n에서 연결된 간선을 제거하며 전입차수가 0이 되는 것들을 dq에 담기
while (!dq.isEmpty()) {
  const n = dq.dequeue()
  result.push(n)
  G[n].forEach(nxt => {
    Indegree[nxt] -= 1
    if (Indegree[nxt] === 0) {
      dq.enqueue(nxt)
    }
  })
}

// 줄을 세우지 못 하면 0 출력
if (result.length === N) {
  console.log(result.join('\n'))
} else {
  console.log(0)
}