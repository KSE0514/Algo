const fs = require('fs')
var [[N, T], ...studyList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./14728input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

const dp = Array(T+1).fill(0)

for (let i = 0; i < N; i++) {
  const studyTime = studyList[i][0]
  const studyPoint = studyList[i][1]

  for (let time = T; time >= studyTime; time--) {
    dp[time] = Math.max(dp[time], dp[time - studyTime] + studyPoint)
  }
}
console.log(dp[T])