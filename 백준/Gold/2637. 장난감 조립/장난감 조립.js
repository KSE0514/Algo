const fs = require('fs')
var [[N], [M], ...partInfoList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./2637input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

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

const R = Array.from({length: N + 1}, () => []) // 역방향

const partCnt = Array(N+1).fill(0) // 각 인덱스 번호의 부품이 필요한 개수
partCnt[N] = 1
const basicParts = [] // 기본 부품들의 번호를 담을 배열
const Indegree = Array(N+1).fill(0) // 전입차수
const rIndegree = Array(N+1).fill(0)

partInfoList.forEach(partInfo => {
  const [X, Y, K] = partInfo // X를 만드는 데 Y가 K개 필요
  Indegree[X] += 1
  rIndegree[Y] += 1
  R[X].push([Y, K])
})

// 기본 부품 파악하기(전입차수가 0인 것들)
for (let i = 1; i <= N-1; i++) {
  if (Indegree[i] == 0) {
    basicParts.push(i)
  }
}


// 위상정렬_각 부품이 필요한 총 개수 계산
const dq = new Q()
dq.enqueue(N)
while (!dq.isEmpty()) {
  const curN = dq.dequeue()
  R[curN].forEach(nxtInfo => {
    const [nxtN, num] = nxtInfo
    rIndegree[nxtN] -= 1
    partCnt[nxtN] += partCnt[curN]*num
    if (rIndegree[nxtN] === 0) {
      dq.enqueue(nxtN)
    }
  })
}

// 출력
basicParts.forEach(basicPart => {
  console.log(basicPart, partCnt[basicPart])
})