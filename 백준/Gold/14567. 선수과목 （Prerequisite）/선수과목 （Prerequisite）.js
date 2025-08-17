const fs = require('fs')
var [[N, M], ...subList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./14567input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

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

const G = Array.from({length: N + 1}, () => [])
const Indegree = Array.from({length: N + 1}, () => 0)
subList.forEach(sub => {
  G[sub[0]].push(sub[1])
  Indegree[sub[1]] += 1
})

const dq = new Q()
const result = Array.from({length: N + 1}, () => 0)
for (let i = 1; i <= N; i++) {
  if (Indegree[i] === 0) {
    dq.enqueue(i)
    result[i] = 1
  }
}

while (!dq.isEmpty()) {
  const n = dq.dequeue()
  G[n].forEach(nxt => {
    Indegree[nxt] -= 1
    if (Indegree[nxt] === 0) {
      dq.enqueue(nxt)
      result[nxt] = result[n] + 1
    }
  })
}
console.log(...result.slice(1))