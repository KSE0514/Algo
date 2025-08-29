const fs = require('fs')
var [[N, M, k], costInfo, ...relationships] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./16562input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

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

costInfo = [0, ...costInfo]

const G = Array.from({length: N + 1}, () => [])
const visited = Array.from({length: N + 1}, () => false)

// 친구 관계 그래프(무방향)
relationships.forEach(relationship => {
  const [v, w] = relationship
  if (v !== w) {
    if (!G[v].includes(w)) {
    G[v].push(w)
    }
    if (!G[w].includes(v)) {
      G[w].push(v)
    }
  }
})

const bfs = (start) => {
  const dq = new Q()
  dq.enqueue(start)
  visited[start] = true
  var minV = Infinity
  while (!dq.isEmpty()) {
    const cur = dq.dequeue()
    minV = Math.min(minV, costInfo[cur])
    G[cur].forEach(nxt => {
      if (!visited[nxt]) {
        visited[nxt] = true
        dq.enqueue(nxt)
      }
    })
  }

  return minV
}

var sumCost = 0
var isPossible = 1
for (let i = 1; i <= N; i++) {
  if (!visited[i]) {
    sumCost += bfs(i)
    if (sumCost > k) {
      isPossible = 0
      break
    }
  }
}

if (isPossible) {
  console.log(sumCost)
} else {
  console.log("Oh no")
}