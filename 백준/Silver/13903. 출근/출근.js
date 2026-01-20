const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin": "./13903input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

const [R, C] = input.splice(0, 1)[0]
const board = input.splice(0, R)
const [N] = input.splice(0, 1)[0]
const dir = [...input]

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

const visited = Array.from({length: R}, () => Array(C).fill(-1))
function bfs(dq) {
  while (!dq.isEmpty()) {
    const [curR, curC] = dq.dequeue()
    if (curR === R-1) {
      return visited[curR][curC]
    }
    for (let i = 0; i < N; i++) {
      const [newR, newC] = [curR + dir[i][0], curC + dir[i][1]]
      if (newR < 0 || newR >= R || newC < 0 || newC >= C) continue
      if (board[newR][newC] && visited[newR][newC] === -1) {
        visited[newR][newC] = visited[curR][curC] + 1
        dq.enqueue([newR, newC])
      }
    }
  }
  return -1
}

const dq = new Q()
for (let col = 0; col < C; col++) {
  if (board[0][col]) {
    dq.enqueue([0, col])
    visited[0][col] = 0
  }
}

console.log(bfs(dq))