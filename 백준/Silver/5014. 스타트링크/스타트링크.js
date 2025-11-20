const fs = require('fs')
var [F, S, G, U, D] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./5014input.txt").toString().trim().split(' ').map(Number)

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
    return this.head === this.queue.length
  }
}
const move = [U, D]

const bfs = (start) => {
  const dq = new Q()
  dq.enqueue(start)
  const visited = Array(F+1).fill(-1)
  visited[start] = 0

  while (!dq.isEmpty()) {
    const cur = dq.dequeue()

    // 스타트링크에 도착하면 => 버튼 누른 횟수 반환
    if (cur === G) {
      return visited[cur]
    }

    move.forEach((mV, idx) => {
      var nxt = cur
      if (idx === 0) { // U 버튼
        nxt += mV
      } else { // D 버튼
        nxt -= mV
      }
      if (0 < nxt && nxt <= F && visited[nxt] === -1) {
        visited[nxt] = visited[cur] + 1
        dq.enqueue(nxt)
      }
    })
  }

  // 스타트링크에 갈 수 없으면 => 'use the stairs' 반환
  return "use the stairs"
}

// 출력
console.log(bfs(S))