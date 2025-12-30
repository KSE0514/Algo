const fs = require('fs')
var [N, ...arr] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./5958input.txt").toString().trim().split('\n').map(el => el.trim())
N = Number(N)

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

const d = [1, 0, -1, 0]
const bfs = (stR, stC) => {
  const dq = new Q()
  dq.enqueue([stR, stC])
  visited[stR][stC] = true

  while (!dq.isEmpty()) {
    const [curR, curC] = dq.dequeue()
    for (let i = 0; i < 4; i ++) {
      const newR = curR + d[i]
      const newC = curC + d[(i+1)%4]
      if (newR < 0 || newR >= N || newC < 0 || newC >=N || visited[newR][newC]) continue
      if (arr[newR][newC] === '*') {
        visited[newR][newC] = true
        dq.enqueue([newR, newC])
      }
    }
  }
}

const visited = Array.from({length: N}, () => Array(N).fill(false))

var cnt = 0
for (let r = 0; r < N; r++) {
  for (let c = 0; c < N; c++) {
    if (arr[r][c] === '*' && !visited[r][c]) {
      bfs(r, c)
      cnt++
    }
  }
}

console.log(cnt)