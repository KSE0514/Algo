const fs = require('fs')
var input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./17086input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
var [N, M] = input[0]
input = input.slice(1)

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

var dq = new Q()
var visited = Array.from({length: N}, () => Array.from({length: M}, () => 0))
for (let r = 0; r < N; r ++) {
  for (let c = 0; c < M; c++) {
    if (input[r][c]) {
      dq.enqueue([r, c])
      visited[r][c] = 1
    }
  }
}

const dx = [1, 0, -1, 0, 1, -1, 1, -1]
const dy = [0, 1, 0, -1, 1, -1, -1, 1]
var maxSafe = 0
while (!dq.isEmpty()) {
  var [curR, curC] = dq.dequeue()
  for (let i = 0; i < 8; i++) {
    var newR = curR + dx[i], newC = curC + dy[i]
    if (newR < 0 || newR >= N || newC < 0 || newC >= M) continue
    if (!visited[newR][newC]) {
      visited[newR][newC] = visited[curR][curC] + 1
      dq.enqueue([newR, newC])
      maxSafe = Math.max(maxSafe, visited[newR][newC] - 1)
    }
  }
}

console.log(maxSafe)