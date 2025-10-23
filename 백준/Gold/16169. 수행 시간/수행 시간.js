const fs = require('fs')
var [[n], ...comInfo] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./16169input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

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


const rankG = Array.from({length: n + 1}, () => [])
const Indegree = Array(n+1).fill(0)
const dp = Array(n+1).fill(0) // 각 컴퓨터가 작업을 마치기까지 걸린 시간

const dq = new Q()
comInfo.forEach((comI, idx) => {
  const [comRank, time] = comI
  rankG[comRank].push([idx+1, time])
  if (comRank === 1) {
    dq.enqueue([1, idx+1, time])
    dp[idx+1] = time
  }
})

// 전입차수 채우기
for (let i = 2; i <= n; i++) {
  for (let j = 0; j < rankG[i].length; j++) {
    Indegree[rankG[i][j][0]] = rankG[i-1].length
  }
}

while (!dq.isEmpty()) {
  const [curR , curN, curT] = dq.dequeue() // 계급, 컴퓨터 번호, 동작 시간
  if (curR + 1 <= n) {
    rankG[curR+1].forEach(nxtInfo => {
      const [nxtN, nxtT] = nxtInfo
      Indegree[nxtN] -= 1
      dp[nxtN] = Math.max(dp[nxtN], dp[curN] + nxtT + (nxtN - curN)**2)
      if (Indegree[nxtN] === 0) {
        dq.enqueue([curR+1, nxtN, nxtT])
      }
    })
  }
}

// console.log(dp)
console.log(Math.max(...dp))