const fs = require('fs')
const [[K, N, M], ...input] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./6207input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

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

let cowP = input.splice(0, K)
cowP = cowP.map(cow => cow[0])
const countList = Array(N+1).fill(0)
const G = Array.from({length: N + 1}, () => [])
input.forEach(line => {
  const [A, B] = line
  G[A].push(B)
})

const bfs = (st) => {
  const dq = new Q()
  dq.enqueue(st)
  const visited = Array(N+1).fill(false)
  visited[st] = true

  while (!dq.isEmpty()) {
    const cur = dq.dequeue()
    for (let nxt of G[cur]) {
      if (!visited[nxt]) {
        visited[nxt] = true
        countList[nxt] += 1
        dq.enqueue(nxt)
      }
    }
  }
}

for (let i = 0; i < K; i++) {
  countList[cowP[i]] += 1
  bfs(cowP[i])
}

const cnt = countList.reduce((prev, cur) => {
  if (cur === K) return prev + 1
  return prev
}, 0)
console.log(cnt)