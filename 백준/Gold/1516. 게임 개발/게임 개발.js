const fs = require('fs')
var [[N], ...buildList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./1516input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

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

const times = Array.from({length: N+1}, () => 0) // 각 건물이 지어지는데 걸리는 시간
const G = Array.from({length: N + 1}, () => []) // 방향 그래프
const Indegree = Array.from({length: N + 1}, () => 0) // 전입 차수

// 1. 전입 차수 및 그래프 채우기
buildList.forEach((build, idx) => {
  times[idx+1] = build[0]
  build.pop()
  build.forEach((bfN, i) => {
    if (i !== 0) {
      G[bfN].push(idx+1)
      Indegree[idx+1] += 1
    }
  })
})
const minCompleteT = [...times] // 각 건물 완공까지의 최소 시간

const dq = new Q()
// 2. 전입차수가 0인 건물들을 dq의 초기요소들로 설정
for (let i = 1; i <= N; i++) {
  if (Indegree[i] === 0) {
    dq.enqueue(i)
  }
}

// 3. 위상 정렬
while (!dq.isEmpty()) {
  const num = dq.dequeue()
  G[num].forEach(nxt => {
    Indegree[nxt] -= 1
    minCompleteT[nxt] = Math.max(minCompleteT[nxt], minCompleteT[num] + times[nxt])
    if (Indegree[nxt] === 0) {
      dq.enqueue(nxt)
    }
  })
}

// 출력
console.log(minCompleteT.slice(1).join('\n'))