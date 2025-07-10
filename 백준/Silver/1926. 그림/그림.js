const fs = require('fs')
var input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./1926input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
const [n, m] = input[0]
input = input.slice(1)

var maxSize = 0
var cnt = 0
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

const bfs = (stR, stC) => {
  const dq = new Q()
  dq.enqueue([stR, stC])
  var size = 0
  input[stR][stC] = 0
  while (!dq.isEmpty()) {
    const [curR, curC] = dq.dequeue()
    size++
    for ([r, c] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const [newR, newC] = [curR+r, curC+c]
      if (newR < 0 || newR >= n || newC < 0 || newC >= m) continue
      if (input[newR][newC] === 1) {
        dq.enqueue([newR, newC])
        input[newR][newC] = 0
      }
    }
  }
  maxSize = Math.max(maxSize, size)
}

for (let r = 0; r < n; r++) {
  for (let c = 0; c < m; c++) {
    if (input[r][c]) {
      cnt++
      bfs(r, c)
    }
  }
}

console.log(cnt)
console.log(maxSize)