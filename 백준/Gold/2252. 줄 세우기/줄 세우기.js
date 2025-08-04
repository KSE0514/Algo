const fs = require('fs')
var [[N, M], ...input] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./2252input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
const G = Array.from({length: N + 1}, () => []) // 방향 그래프
const Indegree = Array.from({length: N + 1}, () => 0) // 진입 차수(위상정렬 이용)

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

input.forEach(comp => {
  G[comp[0]].push(comp[1])
  Indegree[comp[1]] += 1
})

var dq = new Q()
// 1. 맨 처음 진입차수가 0인 것들 전부 dq에 담기
for (let i = 1; i <= N; i++) {
  if (Indegree[i] === 0) {
    dq.enqueue(i)
  }
}

var result = []
// 2. 위상정렬_dq에서 원소를 하나씩 꺼내고, 그 원소와 연결된 간선들 제거(===연결된 노드의 진입차수 1씩 줄이기)
while (!dq.isEmpty()) {
  var n = dq.dequeue()
  result.push(n)
  G[n].forEach(next => {
    Indegree[next] -= 1
    // n과 연결된 간선 제거후 진입차수가 0인 노드가 있으면 dq에 추가
    if (Indegree[next] === 0) {
      dq.enqueue(next)
    }
  })
}

// 출력
console.log(...result)