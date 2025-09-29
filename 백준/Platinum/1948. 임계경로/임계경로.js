const fs = require('fs')
const [[n], [m], ...rootInfo] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./1948input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
const [start, end] = rootInfo.pop()

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

const G = Array.from({length: n + 1}, () => []) // 방향 그래프
const R = Array.from({length: n + 1}, () => []) // 역방향 그래프
const indegree = Array(n + 1).fill(0) // 전입차수
const dp = Array(n + 1).fill(0) // 누적 최대 소요시간

rootInfo.forEach(root => {
  G[root[0]].push([root[1], root[2]])
  R[root[1]].push([root[0], root[2]])
  indegree[root[1]] += 1
})

const dq = new Q()
dq.enqueue(start)

// 위상정렬
while (!dq.isEmpty()) {
  const cur= dq.dequeue()
  G[cur].forEach((nxtInfo) => {
    const [nxt, nTime] = nxtInfo // 다음 도시 번호, 현재 도시에서 다음 도시까지의 가는 데 걸리는 시간
    
    // nxt 도시까지 가는 데 가장 오래 걸리는 방법이라면 누적 최대소요시간 업데이트
    if (dp[cur] + nTime > dp[nxt]) {
      dp[nxt] = dp[cur] + nTime
    }
    indegree[nxt] -= 1
    if (indegree[nxt] === 0) {
      dq.enqueue(nxt)
    }
  })
}

// 출력1
console.log(dp[end])

// 역추적_bfs로 간선 개수 세기
var cnt = 0
const visited = Array(n + 1).fill(false)
const dq2 = new Q()
dq2.enqueue(end)
visited[end] = true

while (!dq2.isEmpty()) {
  const cur = dq2.dequeue()
  R[cur].forEach(preInfo => {
    const [pre, preTime] = preInfo
    if (dp[pre] + preTime === dp[cur]) {
      cnt ++
      if (!visited[pre]) {
        visited[pre] = true
        dq2.enqueue(pre)
      }
    }
  })
}

// 출력2
console.log(cnt)



// ///////////// 1차 시도_메모리 초과
// const fs = require('fs')
// const [[n], [m], ...rootInfo] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./1948input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
// const [start, end] = rootInfo.pop()

// class Q {
//   constructor() {
//     this.queue = []
//     this.head = 0
//   }

//   enqueue(value) {
//     this.queue.push(value)
//   }

//   dequeue() {
//     return this.queue[this.head++]
//   }

//   isEmpty() {
//     return this.queue.length === this.head
//   }
// }

// const G = Array.from({length: n + 1}, () => []) // 방향 그래프
// const indegree = Array(n + 1).fill(0) // 전입차수
// const dp = Array(n + 1).fill(0) // 누적 최대 소요시간
// const rootLog = Array.from({length: n + 1}, () => new Set()) // 각 지점까지 1분도 쉬지 않고 달려야 하는 도로들을 담을 set(해당 지점에 가장 늦게 도착했을 때 거쳤던 도로들(중복X))
// rootInfo.forEach(root => {
//   G[root[0]].push([root[1], root[2]])
//   indegree[root[1]] += 1
// })

// const dq = new Q()
// dq.enqueue(start)

// // 위상정렬
// while (!dq.isEmpty()) {
//   const cur= dq.dequeue()
//   G[cur].forEach((nxtInfo) => {
//     const [nxt, nTime] = nxtInfo // 다음 도시 번호, 현재 도시에서 다음 도시까지의 가는 데 걸리는 시간
//     const newRootLog = new Set([...rootLog[cur], [cur, nxt]]) // nxt 도시까지 가는 데 거쳐온 모든 길을 담은

//     // nxt 도시까지 가는 데 가장 오래 걸리는 방법이라면 누적 최대소요시간(dp[nxt]) 업데이트&가는데 거쳤던 모든 길(rootLog[nxt]) 새롭게 갱신
//     if (dp[cur] + nTime > dp[nxt]) {
//       dp[nxt] = dp[cur] + nTime
//       rootLog[nxt] = newRootLog
//     } else if (dp[cur] + nTime === dp[nxt]) {
//       // 최대 소요시간과 같은 시간이 걸리는 방법이라면 지나왔던 길들만 추가로 업데이트
//       rootLog[nxt] = new Set([...rootLog[nxt], ...newRootLog])
//     }
//     indegree[nxt] -= 1
//     if (indegree[nxt] === 0) {
//       dq.enqueue(nxt)
//     }
//   })
// }

// // 출력
// console.log(dp[end])
// console.log(rootLog[end].size)