const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? '/dev/stdin' : './14940input.txt').toString().trim().split('\n').map(el => el.split(' ').map(Number))


// 큐 구현
class Q {
  constructor () {
    this.queue = []
    this.head = 0
  }

  enqueue (value) {
    this.queue.push(value)
  }

  dequeue () {
    return this.queue[this.head++]
  }

  isEmpty () {
    return this.queue.length === this.head
  }
}

const [n, m] = input.shift()
let start = []
const deq = new Q()
for (let r = 0; r < n; r ++) {
  if (input[r].indexOf(2) !== -1) {
    const c = input[r].indexOf(2)
    deq.enqueue([r, c])
    start = [r, c]
    input[r][c] = 0
    break
  }
}

const vector = [[1, 0], [-1, 0], [0, 1], [0, -1]]
while (!deq.isEmpty()) {
  const [curR, curC] = deq.dequeue()
  vector.forEach(el => {
    const nxtR = curR + el[0]
    const nxtC = curC + el[1]
    if (0<= nxtR && nxtR<n && 0 <= nxtC && nxtC < m && input[nxtR][nxtC] === 1) {
      input[nxtR][nxtC] = input[curR][curC] - 1
      deq.enqueue([nxtR, nxtC])
    }
  })
}

for (let r = 0; r < n; r++) {
  for (let c = 0; c < m; c++) {
    if (input[r][c] !== 0) {
      input[r][c] = (-1)*input[r][c]
    }
  }
}
input.forEach(row => console.log(row.join(' ')))