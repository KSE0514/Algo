const fs = require('fs')
var input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./2206input.txt").toString().trim().split('\n').map(el => el.trim().split(' '))
var [N, M] = input[0].map(Number)
input = input.slice(1)

// 미로를 숫자 타입 2차원 배열로 바꾸기
input = input.map(row => {
  return row[0].split('').map(char => Number(char))
})

visited = Array.from({length: N} , () => Array.from({length: M}, () => [false, false]))

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

var minV = Infinity

const dq = new Q()
dq.enqueue([0, 0, 1, 0]) // 행, 열, 거리, 벽을 부순적이 있는지 여부
visited[0][0][0] = true

while (!dq.isEmpty()) {
  const [curR, curC, curD, broken] = dq.dequeue()

  if (curR === N - 1 && curC === M - 1) {
    minV = curD
    break
  }

  for (const [r, c] of [[1, 0], [0, 1], [-1, 0], [0, -1]]) {
    const nxtR = curR + r
    const nxtC = curC + c
    if (nxtR < 0 || nxtR >= N || nxtC < 0 || nxtC >= M) {
      continue
    }

    if (input[nxtR][nxtC] === 0 && !visited[nxtR][nxtC][broken]) {
      visited[nxtR][nxtC][broken] = true
      dq.enqueue([nxtR, nxtC, curD + 1, broken])
    }

    // 벽을 아직 안 부순 상황에서 벽을 만날 경우
    if (input[nxtR][nxtC] === 1 && broken === 0 &&!visited[nxtR][nxtC][broken]) {
      visited[nxtR][nxtC][1] = true
      dq.enqueue([nxtR, nxtC, curD + 1, 1]) 
    }
    }
}


// 경로가 없다면 -1 출력
if (minV !== Infinity) {
  console.log(minV)
} else {
  console.log(-1)
}