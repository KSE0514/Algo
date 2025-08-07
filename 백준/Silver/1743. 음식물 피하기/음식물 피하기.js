const fs = require('fs')
var [[N, M, K], ...foodWasts] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./1743input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

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

const fwMap = Array.from({length: N}, () => Array.from({length: M}, () => 0))
foodWasts.forEach(fw => {
  fwMap[fw[0]-1][fw[1]-1] = 1
})

const d = [1, 0, -1, 0]
const bfs = (stR, stC) => {
  const dq = new Q()
  dq.enqueue([stR, stC])
  var midMax = 1
  fwMap[stR][stC] = 0
  while (!dq.isEmpty()) {
    var [curR, curC] = dq.dequeue()
    for (let i = 0; i < 4; i++) {
      var newR = curR + d[i]
      var newC = curC + d[(i+1)%4]
      if (newR < 0 || newR >= N || newC < 0 || newC >= M) continue
      if (fwMap[newR][newC]) {
        fwMap[newR][newC] = 0
        dq.enqueue([newR, newC])
        midMax ++
      }
    }
  }
  return midMax
}

var maxV = 0
for (let r = 0; r < N; r++) {
  for (let c = 0; c < M; c++) {
    if (fwMap[r][c]) {
      maxV = Math.max(maxV, bfs(r, c))
    }
  }
}

console.log(maxV)