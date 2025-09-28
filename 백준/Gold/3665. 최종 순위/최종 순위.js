const fs = require('fs')
var [[T], ...tcList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./3665input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

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
  const [n] = tcList[idx++]
  const preRanking = tcList[idx++] // 작년 순위
  const [changeNum] = tcList[idx++] // 순위가 바뀐 쌍의 수
  if (changeNum === 0) {
    console.log(...preRanking) // 순위가 안 바뀌었다면 작년 순위 그대로 출력
  }

  // 순위가 바뀌었을 경우
  else {
    const G = Array.from({length: n + 1}, () => []) // 방향 그래프
    const indegree = Array(n + 1).fill(0) // 전입 차수
  
    // 작년 순위를 기반으로 순위 순서와 전입차수 채우기
    for (let i = 0; i < n - 1; i++) {
      for (let j = i + 1; j < n; j++) {
        G[preRanking[i]].push(preRanking[j])
        indegree[preRanking[j]] += 1
      }
    }
  
    // 순위가 바뀐 팀에 대하여 방향 그래프 및 전입차수 정보 업데이트
    for (let i = 0; i < changeNum; i++) {
      const [a, b] = tcList[idx++] // 순위가 바뀐 팀 a, b
      const rankOfa = preRanking.indexOf(a)
      const rankOfb = preRanking.indexOf(b)
      
      // a의 순위가 더 높았다면
      if (rankOfa < rankOfb) {
        G[a] = G[a].filter(v => v != b)
        G[b].push(a)
        indegree[a] += 1
        indegree[b] -= 1
      } else { 
        // b의 순위가 더 높았다면
        G[b] = G[b].filter(v => v != a)
        G[a].push(b)
        indegree[b] += 1
        indegree[a] -= 1
      }
    }

    const newRanking = [] // 올해 순위
    const dq = new Q()

    // 1순위인 번호 찾기
    for (let i = 1; i <= n; i++) {
      if (indegree[i] === 0) {
        dq.enqueue(i)
      }
    }

    // 1순위인 게 여러개라면 IMPOSSIBLE 출력후 스킵
    if (dq.queue.length !== 1) {
      console.log("IMPOSSIBLE")
      continue
    }

    let isImpossible = 0 // 순서를 정할 수 없는지 여부
    while (!dq.isEmpty()) {
      const curN = dq.dequeue()
      newRanking.push(curN)
      let nxtCnt = 0
      G[curN].forEach(nxtN => {
        indegree[nxtN] -= 1
        if (indegree[nxtN] === 0) {
          nxtCnt += 1
          dq.enqueue(nxtN)
        }
      })
      // 다음 순위인 게 여러 개이면 불가능하다 판단하기
      if (nxtCnt > 1) {
        isImpossible = 1
        break
      }
    }

    // 출력
    if (isImpossible || newRanking.length !== n) {
      console.log("IMPOSSIBLE")
    } else {
      console.log(...newRanking)
    }
  }
}