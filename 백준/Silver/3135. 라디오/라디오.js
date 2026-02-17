const fs = require('fs')
const [[A, B], [N], ...jumpList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./3135input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

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

const MAX = 100000
const visited = Array(MAX + 1).fill(-1)

const dq = new Q()

const bfs = () => {
  while (!dq.isEmpty()) {
    const cur = dq.dequeue()
    if (cur === B) {
      return visited[B]
    }

    for (let i of [1, -1]) {
      const nxt = cur + i
      if (0 <= nxt && nxt <= MAX && visited[nxt] === -1) {
        visited[nxt] = visited[cur] + 1
        dq.enqueue(nxt)
      }
    }

    // 점프 버튼
    for (const [j] of jumpList) {
      if (visited[j] === -1) {
        visited[j] = visited[cur] + 1
        dq.enqueue(j)
      }
    }
  }
}

visited[A] = 0
dq.enqueue(A)

console.log(bfs())