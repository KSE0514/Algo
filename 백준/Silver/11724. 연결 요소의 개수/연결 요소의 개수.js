const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : './11724input.txt').toString().trim().split('\n').map(el => el.split(' ').map(Number))

const [N, M] = input[0] // 정점 개수, 간선 개수
const G = Array.from({length: N+1}, () => [])
const visited = Array.from({length: N+1}, () => false)
for (let i = 1; i<=M; i++) {
  const [u, v] = input[i]
  G[u].push(v)
  G[v].push(u)
}

class Q {
  constructor () {
    this.queue = []
    this.head = 0
  }

  enqueue (value) {
    this.queue.push(value)
  }

  dequeue () {
    return this.queue[this.head++]
  }

  isEmpty () {
    return this.queue.length === this.head 
  }
}

visited[0] = true
let cnt = 0
while (visited.indexOf(false) != -1) {
  const deq = new Q()
  const unVisited = visited.indexOf(false)
  deq.enqueue(unVisited)
  visited[unVisited] = true
  while(!deq.isEmpty()) {
    const cur = deq.dequeue()
    for (v of G[cur]) {
      if (!visited[v]) {
        deq.enqueue(v)
        visited[v] = true
      }
    }
  }
  cnt++
}

console.log(cnt)