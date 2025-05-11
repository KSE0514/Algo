const fs = require('fs')
var N = Number(fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./17212input.txt").toString().trim())

const coins = [7, 5, 2, 1]

const dp = Array(N+1).fill(N)
for (coin of coins) {
  if (coin <= N){
    dp[coin] = 1
  }
}

if (N == 0) {
  console.log(0)
} else {
  for (let i =  1; i<= N; i ++){
    for (coin of coins) {
      if (coin < i) {
        dp[i] = Math.min(dp[i], dp[i-coin] + 1)
      }
    }
  }
  console.log(dp[N])
}