const fs = require('fs')
var [[a, b], [N, M], ...list] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./14496input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

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

const bfs = (st, ed) => {
  const dq = new Q()
  visited[st] = 0
  let result = -1
  dq.enqueue(st)

  while (!dq.isEmpty()) {
    const cur = dq.dequeue()

    if (cur === ed) {
      result = visited[cur]
      break
    }

    for (let nxt of G[cur]) {
      if (visited[nxt] === -1) {
        visited[nxt] = visited[cur] + 1
        dq.enqueue(nxt)
      }
    }
  }
  return result
}


list.forEach(li => {
  const [n1, n2] = li
  G[n1].push(n2)
  G[n2].push(n1)
})

console.log(bfs(a, b))