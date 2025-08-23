const fs = require('fs')
var [[N], ...workList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./2056input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

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

const G = Array.from({length: N+1}, () => []) // 방향 그래프
const indegree = Array.from({length: N+1}, () => 0) // 전입차수
const workTime = Array.from({length: N+1}, () => 0) // 각 idx번호의 작업이 끝나는데 걸리는 총 시간

workList.forEach((workInfo, idx) => {
  const workNum = idx+1 // 작업 번호
  const [time, preTaskNum, ...preTasks] = workInfo // 작업에 걸리는 시간, 선행 작업 수, 선행 작업 목록

  workTime[workNum] = time // 초기값 보정
  indegree[workNum] = preTaskNum // 전입차수 저장
  // 작업 순서도 그래프
  preTasks.forEach(preTask => {
    G[preTask].push(workNum)
  })
})

const dq = new Q()
// 전입 차수가 0인 것들 모두 담기
for (let i = 1; i <= N; i++) {
  if (indegree[i] === 0) {
    dq.enqueue(i)
  }
}

// 위상 정렬
while (!dq.isEmpty()) {
  const curWork = dq.dequeue() // 현재 작업 번호
  G[curWork].forEach(nxtWork => {
    indegree[nxtWork] -= 1
    workTime[nxtWork] = Math.max(workTime[nxtWork], workTime[curWork] + workList[nxtWork-1][0])
    if (indegree[nxtWork] === 0) {
      dq.enqueue(nxtWork)
    }
  })
}

// 출력
console.log(Math.max(...workTime))