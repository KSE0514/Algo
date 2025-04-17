const fs = require('fs')
const input = fs.readFileSync(process.platform == 'linux' ? '/dev/stdin' : './7569input.txt').toString().trim().split('\n').map((el)=>el.split(' ').map(Number))

const [M, N, H] = input.shift() // 열, 행, 높이

const tomatos = [] // 토마토를 담을 3차원 배열
let array = [] // 임시 배열
let i = 0
// tomatos 배열 채우기
input.map(el => {
  array.push(el)
  i += 1
  if (i === N) {
    i = 0
    tomatos.push(array)
    array = []
  }
})

// deque 직접 구현하기
class Queue {
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

const Q = new Queue()

// 익은 토마토 좌표 찾아서 Q에 담기
tomatos.map((tomatoBox, hIdx)=>{
  tomatoBox.map((tomatoBoxRow, rIdx)=> {
    let cIdx = tomatoBoxRow.indexOf(1)
    while (cIdx != -1) {
      Q.enqueue([hIdx, rIdx, cIdx])
      cIdx = tomatoBoxRow.indexOf(1, cIdx+1)
    }
  })
})

let days = 0
// bfs
const addArray = [[0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1], [1, 0, 0], [-1, 0, 0]]
while (!Q.isEmpty()) {
  const [curH, curR, curC] = Q.dequeue()
  addArray.map(add => {
    const nextH = curH + add[0]
    const nextR = curR + add[1]
    const nextC = curC + add[2]
    if (nextH >= 0 && nextH < H && nextR >= 0 && nextR < N && nextC >= 0 && nextC < M && tomatos[nextH][nextR][nextC] === 0) {
      // 새 좌표가 범위에 벗어나지 않았으면서, 아직 안 익은 토마토가 있으면
      tomatos[nextH][nextR][nextC] = tomatos[curH][curR][curC] + 1
      Q.enqueue([nextH, nextR, nextC])
      days = Math.max(days, tomatos[nextH][nextR][nextC])
    }
  })
}

// 안 익은 토마토가 존재한다면 -1 출력하고, 아니면 걸린 시간 출력
let flag = -1
for (let h = 0; h < H; h++) {
  for (let r = 0; r < N; r++) {
    flag = tomatos[h][r].indexOf(0)
    if (flag !== -1) {
      break
    }
  }
  if (flag !== -1) {
    break
  }
}

if (flag !== -1) {
  console.log(-1)
} else {
  if (days === 0) {
    console.log(days)
  } else {
    console.log(days - 1)
  }
}