const fs = require('fs')
var [[N], [M], ...roadInfo] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./2611input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

class Q {
  constructor() {
    this.queue = []
    this.head = []
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

const G = Array.from({length: N + 1}, () => [])
const R = Array.from({length: N + 1}, () => [])
const indegree = Array(N+1).fill(0)
const maxPoint = Array(N+1).fill(0)

roadInfo.forEach(roadI => {
  const [p, q, r] = roadI // p에서 q지점까지의 도로에 부여된 점수 r
  G[p].push([q, r])
  R[q].push([p, r])
  indegree[q] += 1
})

const dq = new Q()
dq.enqueue(1)

while (!dq.isEmpty()) {
  const cur = dq.dequeue()
  G[cur].forEach(nxtInfo => {
    const [nxt, point] = nxtInfo
    indegree[nxt] -= 1
    if (maxPoint[nxt] < maxPoint[cur] + point) {
      maxPoint[nxt] = maxPoint[cur] + point
    }
    if (indegree[nxt] === 0 && nxt != 1) {
      dq.enqueue(nxt)
    }
  })
}

// 출력1
console.log(maxPoint[1])

// 역추적
const result = []
var cur = 1
var maxP = maxPoint[1]
maxPoint[1] = 0
while (maxP != 0) {
  result.push(cur)
  for (let idx = 0; idx < R[cur].length; idx ++) {
    const [pre, prePoint] = R[cur][idx]
    if (maxP - prePoint === maxPoint[pre]) {
      cur = pre
      maxP -= prePoint
      break
    }
  }
}
result.push(1)
result.reverse()

// 출력2
console.log(result.join(' '))