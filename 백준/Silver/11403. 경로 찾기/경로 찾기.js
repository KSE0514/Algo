const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./11403input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

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

const [N] = input.shift()
const bfs = (start) => {
  const queue = new Q
  queue.enqueue(start)
  const visited = Array.from({length: N}, () => 0)

  while (!queue.isEmpty()) {
    const cur = queue.dequeue()
    input[cur].forEach((v, nxt) => {
      if (!visited[nxt] && v === 1) {
        visited[nxt] = 1
        queue.enqueue(nxt)
      }
    })
  }
  console.log(...visited)
}

for (let i = 0; i < N; i++) {
  bfs(i)
}