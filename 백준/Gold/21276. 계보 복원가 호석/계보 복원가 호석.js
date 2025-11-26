const fs = require('fs')
var [[N], nameList, [M], ...preInfo] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./21276input.txt").toString().trim().split('\n').map(el => el.trim().split(' '))

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

N = Number(N)
M = Number(M)
nameList.sort((a, b) => a.localeCompare(b))

nameDic = {}
nameList.forEach((nam, idx) => {
  nameDic[nam] = idx
})
indegree = Array(N).fill(0)
G = Array.from({length: N}, () => [])

preInfo.forEach(preI => {
  const [X, Y] = preI
  const [XNum, YNum] = [nameDic[X], nameDic[Y]]
  G[YNum].push(XNum)
  indegree[XNum] += 1
})

// 가문의 시조 찾기
const dq = new Q()
const start = []
for (let i = 0; i < N; i++) {
  if (indegree[i] === 0) {
    dq.enqueue(i)
    start.push(nameList[i])
  }
}

// 출력1_가문 개수, 시조 이름
console.log(start.length)
console.log(...start)

child = Array.from({length: N}, () => [])
while (!dq.isEmpty()) {
  const cur = dq.dequeue()
  G[cur].sort((a, b) => a-b)
  G[cur].forEach(nxt => {
    indegree[nxt] -= 1
    if (indegree[nxt] === 0) {
      child[cur].push(nameList[nxt])
      dq.enqueue(nxt)
    }
  })
}

// 출력2_자식 정보
for (let i = 0; i < N; i++) {
  console.log(nameList[i], child[i].length, ...child[i])
}