const fs = require('fs')
var [[T], ...tcList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./11123input.txt").toString().trim().split('\n').map(el => el.trim().split(' '))

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


for (let tc = 0; tc < T; tc ++) {
  const [H, W] = tcList[0].map(Number)
  const arr = tcList.slice(1, 1 + H).map(el => el[0].split(''))
  tcList = tcList.slice(1+H)
  var cnt = 0

  const d = [1, 0 , -1, 0]
  const bfs = (stR, stC) => {
    const dq = new Q()
    dq.enqueue([stR, stC])
    arr[stR][stC] = '.'
    while (!dq.isEmpty()) {
      const [curR, curC] = dq.dequeue()
      for (let i = 0; i < 4; i++) {
        var newR = curR + d[i]
        var newC = curC + d[(i+1)%4]
        if (newR < 0 || newR >= H || newC < 0 || newC >= W) continue
        if (arr[newR][newC] === '#') {
          arr[newR][newC] = '.'
          dq.enqueue([newR, newC])
        }
      }
    }
  }

  for (let r = 0; r < H; r++) {
    for (let c = 0; c < W; c++) {
      if (arr[r][c] === '#') {
        cnt ++
        bfs(r, c)
      }
    }
  }
  console.log(cnt)
}