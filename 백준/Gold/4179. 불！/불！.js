const fs = require('fs')
var [arrInfo, ...arr] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./4179input.txt").toString().trim().split('\n').map(el => el.trim())

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

var [R, C] = arrInfo.split(' ').map(Number)
arr = arr.map(el => el.split(''))

const dq = new Q()
const visited = Array.from({length: R}, () => Array.from({length: C}, () => 0))

var stR = - 1, stC = -1
for (let r = 0; r < R; r++) {
  for (let c = 0; c < C; c++) {
    if (arr[r][c] === 'J') {
      stR = r 
      stC = c
    } else if (arr[r][c] === 'F') {
      dq.enqueue([1, r, c])
    }
  }
}

const d = [1, 0, -1, 0]
dq.enqueue([0, stR, stC])
while (!dq.isEmpty()) {
  var [isFire, curR, curC] = dq.dequeue()
  if (isFire) {
    for (let i = 0; i < 4; i++) {
      var newR = curR + d[i]
      var newC = curC + d[(i+1)%4]
      if (newR < 0 || newR >= R || newC < 0 || newC >= C) continue
      if (arr[newR][newC] === '.' || arr[newR][newC] === 'J') {
        arr[newR][newC] = 'F'
        dq.enqueue([1, newR, newC])
      }
    }
  } else {
    if (curR === 0 || curR === R - 1 || curC === 0 || curC === C - 1) {
      console.log(visited[curR][curC] + 1)
      process.exit()
    }
    for (let i = 0; i < 4; i++) {
      var newR = curR + d[i]
      var newC = curC + d[(i+1)%4]
      if (newR < 0 || newR >= R || newC < 0 || newC >= C) continue
      if (arr[newR][newC] === '.' && visited[newR][newC] === 0) {
        visited[newR][newC] = visited[curR][curC] + 1
        dq.enqueue([0, newR, newC])
      }
    }

  }
}
console.log("IMPOSSIBLE")