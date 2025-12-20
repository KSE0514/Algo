const fs = require('fs')
var [[N, M], [S, E], ...linkList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./18232input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

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

const G = Array.from({length: N+1}, () => [])
const visited = Array(N+1).fill(-1)

const bfs = (st) => {
  const dq = new Q()
  visited[st] = 0
  dq.enqueue(st)

  while (!dq.isEmpty()) {
    const cur = dq.dequeue()

    if (cur === E) {
      return visited[cur]
    }

    for (let nxt of G[cur]) {
      if (visited[nxt] === -1) {
        visited[nxt] = visited[cur] + 1
        dq.enqueue(nxt)
      }
    }

    for (let m of [1, -1]) {
      let nxt = cur + m
      if (1 <= nxt && nxt <= N && visited[nxt] === -1) {
        visited[nxt] = visited[cur] + 1
        dq.enqueue(nxt)
      }
    }
  }
}

for (let i = 0; i < M; i++) {
  const [x, y] = linkList[i]
  G[x].push(y)
  G[y].push(x)
}

console.log(bfs(S))