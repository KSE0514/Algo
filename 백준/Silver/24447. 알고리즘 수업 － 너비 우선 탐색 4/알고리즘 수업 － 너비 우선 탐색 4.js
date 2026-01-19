const fs = require('fs')
const [[N, M, R], ...nodeList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./24447input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

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

function bfs(st) {
  const dq = new Q()
  dq.enqueue(st)
  const depth = Array(N+1).fill(-1)
  const visited = Array(N+1).fill(0)
  let visitedNum = 1
  visited[st] = visitedNum++
  depth[st] = 0

  let tdSum = 0
  while (!dq.isEmpty()) {
    const cur = dq.dequeue()
    tdSum += depth[cur] * visited[cur]
    for (let nxt of G[cur]) {
      if (visited[nxt] === 0) {
        visited[nxt] = visitedNum++
        depth[nxt] = depth[cur] + 1
        dq.enqueue(nxt)
      }
    }
  }
  return tdSum
}

const G = Array.from({length: N+1}, () => [])
nodeList.forEach(node => {
  const [u, v] = node
  G[u].push(v)
  G[v].push(u)
})
// 오름차순 정렬
for (let i = 1; i <= N; i++) {
  G[i] = G[i].sort((a, b) => a-b)
}

console.log(bfs(R))