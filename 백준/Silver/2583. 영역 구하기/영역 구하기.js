const fs = require('fs')
var [[M, N, K], ...rectangles] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./2583input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

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

const arr = Array.from({length: M}, () => Array.from({length: N}, () => 0))

// 직사각형 색칠
rectangles.forEach(rectangle => {
  const c1 = rectangle[0], r1 = rectangle[1]
  const c2 = rectangle[2], r2 = rectangle[3]
  for (let r = r1; r < r2; r++) {
    for (let c = c1; c < c2; c++) {
      arr[r][c] = 1
    }
  }
})

const d = [1, 0 , -1, 0]
const bfs = (stR, stC) => {
  const dq = new Q()
  arr[stR][stC] = 2
  var cnt = 1
  dq.enqueue([stR, stC])
  while (!dq.isEmpty()) {
    const [curR, curC] = dq.dequeue()
    for (let i = 0; i < 4; i++) {
      var newR = curR + d[i]
      var newC = curC + d[(i+1)%4]
      if (newR < 0 || newR >= M || newC < 0 || newC >= N) continue
      if (arr[newR][newC] === 0) {
        arr[newR][newC] = 2
        dq.enqueue([newR, newC])
        cnt ++
      }
    }
  }
  areaSize.push(cnt)
}

var areaCnt = 0
const areaSize = []
for (let r = 0; r < M; r++) {
  for (let c = 0; c < N; c++) {
    if (arr[r][c] === 0) {
      bfs(r, c)
      areaCnt ++
    }
  }
}
areaSize.sort((a, b) => a-b)
console.log(areaCnt)
console.log(...areaSize)