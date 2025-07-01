const fs = require('fs')
var input = fs.readFileSync(process.platform === "linux" ? "/dev/stdin" : "./21736input.txt").toString().trim().split('\n').map(el => el.trim().split(' '))
const [N, M] = input[0].map(Number)
input = input.slice(1)
const visited = Array.from({length: N}, () => Array.from({length: M}, () => false))

var start = []
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

const bfs = (st) => {
  const dq = new Q()
  dq.enqueue(st)
  while (!dq.isEmpty()) {
    const [curR, curC] = dq.dequeue()
    if (!visited[curR][curC]) {
      visited[curR][curC] = true
      if (input[curR][0][curC] === 'P') {
        cnt += 1
      }
      for ([r, c] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const newR = curR + r
        const newC = curC + c
        if (0 <= newR && newR < N && 0 <= newC && newC < M && !visited[newR][newC]) {
          if (input[newR][0][newC] !== 'X') {
            dq.enqueue([newR, newC])
          }
        }
      }
    }
  }
}

// 도연이 위치 찾기
for (let r = 0; r < N; r++) {
  const findStartCol = input[r][0].indexOf('I')
  if (findStartCol !== -1) {
    start = [r, findStartCol]
    break
  }
}

var cnt = 0
bfs(start)

if (cnt === 0) {
  console.log('TT')
} else {
  console.log(cnt)
}