const fs = require('fs')
var proInfo = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./14907input.txt").toString().trim().split('\n').map(el => el.trim().split(' '))

class Q {
  constructor() {
    this.queue = []
    this.head = []
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


const G = Array.from({length: 26}, () => [])
const Indegree = Array(26).fill(-1)
const timeList = Array(26).fill(0) // 각 프로젝트가 
proInfo.forEach(proI => {
  if (proI.length === 2) {
    var [proName, time] = proI
    proName = proName.charCodeAt() - 65 // 아스키 코드 값 - 65 (A는 0으로 B는 1로... 변환됨)
    time = Number(time)
    Indegree[proName] = 0
    timeList[proName] = time
  } else {
    var [proName, time, preWorks] = proI
    proName = proName.charCodeAt() - 65
    time = Number(time)
    preWorks = preWorks.split('')
    Indegree[proName] = preWorks.length
    timeList[proName] = time
    preWorks.forEach(preWork => {
      preWork = preWork.charCodeAt() - 65
      G[preWork].push(proName)
    })
  }
})

// 전입 차수가 0인 프로젝트들 찾기
const dq = new Q()
const dp = Array(26).fill(0)
for (let i = 0; i < 26; i++) {
  if (Indegree[i] === 0) {
    dq.enqueue(i)
    dp[i] = timeList[i]
  }
}

// 위상정렬
while (!dq.isEmpty()) {
  const cur = dq.dequeue()
  G[cur].forEach(nxt => {
    dp[nxt] = Math.max(dp[nxt], dp[cur] + timeList[nxt])
    Indegree[nxt] -= 1
    if (Indegree[nxt] === 0) {
      dq.enqueue(nxt)
    }
  })
}

// 출력
console.log(Math.max(...dp))