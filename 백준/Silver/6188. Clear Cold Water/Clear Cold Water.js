const fs = require('fs')
var [[N, C], ...lineList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./6188input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

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
    return this.head === this.queue.length
  }
}

const bfs = (start) => {
  const dq = new Q()
  dq.enqueue(start)
  visited[start] = 1

  while (!dq.isEmpty()) {
    const cur = dq.dequeue()
    for (const nxt of G[cur]) {
      if (visited[nxt] === -1) {
        visited[nxt] = visited[cur] + 1
        dq.enqueue(nxt)
      }
    }
  }
}

const G = Array.from({length: N + 1}, () => [])
const visited = Array(N+1).fill(-1)

lineList.forEach(line => {
  const [E, B1, B2] = line
  G[E].push(B1)
  G[B1].push(E)
  G[E].push(B2)
  G[B2].push(E)
})

bfs(1)

for (let i = 1; i <= N; i++) {
  console.log(visited[i])
}