const fs = require('fs')
var [[n], [m], ...relationship] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./5567input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

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

const G = Array.from({length: n + 1}, () => [])
const invited = Array.from({length: n + 1}, () => false) // 초대 여부

// 친구 관계 채우기(무방향)
relationship.forEach(re => {
  G[re[0]].push(re[1])
  G[re[1]].push(re[0])
})

const bfs = (n) => {
  const dq = new Q()
  dq.enqueue([n, 0]) // 학번, 상근이와의 관계(차수)
  invited[n] = true
  var cnt = 0 // 초대할 친구 수
  while (!dq.isEmpty()) {
    const [cur, d] = dq.dequeue()
    if (d > 1) break
    G[cur].forEach(nxt => {
      if (!invited[nxt]) {
        cnt ++
        invited[nxt] = true
        dq.enqueue([nxt, d+1])
      }
    })
  }
  return cnt
}

console.log(bfs(1))