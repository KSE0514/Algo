const fs = require('fs')
var [[T], ...input] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./1005input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

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

let idx = 0
for (let tc = 0; tc < T; tc++) {
  // 입력
  var [N, K] = input[idx++]
  const D = [0, ...input[idx++]] // 각 건물당 건설에 걸리는 시간
  const runningTime = [...D] // 각 건물이 완성되기까지 걸리는 시간
  const G = Array.from({length: N + 1}, () => []) // 방향 그래프
  const Indegree = Array.from({length: N + 1}, () => 0) // 전입 차수
  let end = idx // 아래 for문을 끝낼 지점 add 값
  for (idx; idx < K + end; idx++) {
    var [X, Y] = input[idx]
    G[X].push(Y)
    Indegree[Y] += 1
  }
  const [W] = input[idx++] // 승리를 위해 건설해야 할 번호

  // 1. 위상정렬_전입 차수가 0인 건물 번호 전부 담기
  const dq = new Q()
  for (let i = 1; i <= N; i++) {
    if (Indegree[i] === 0) {
      dq.enqueue(i)
    }
  }

  while (!dq.isEmpty()) {
    var n = dq.dequeue()

    // 출력_목표 건물에 도달하면 결과 출력 후 종료
    if (n === W) {
      console.log(runningTime[n])
      break
    }
    // 2. n과 연결된 간선 제거 후 전입차수가 0이 되는 것들 dq에 넣기
    for (nxt of G[n]) {
      Indegree[nxt] -= 1
      // 2-1. nxt건물 건설이 완료될 때까지 걸리는 시간 계산
      runningTime[nxt] = Math.max(runningTime[nxt], runningTime[n] + D[nxt])
      if (Indegree[nxt] === 0) {
        dq.enqueue(nxt)
      }
    }
  }
}