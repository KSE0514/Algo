const fs = require('fs')
var [[N, K], ...subList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./17845input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

const dp = Array(N+1).fill(0)
subList.forEach(sub => {
  const [I, T] = sub // 중요도, 공부 시간
  for (let time = N; time >= T; time--) {
    dp[time] = Math.max(dp[time], dp[time - T] + I)
  }
})

console.log(dp[N])