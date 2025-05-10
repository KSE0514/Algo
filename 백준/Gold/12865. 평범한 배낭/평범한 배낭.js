const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./12865input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

const [N, K] = input.shift()
const dp = Array(K+1).fill(0)
input.forEach(el => {
  const [W, V] = el
  for (let i = K; i >= W; i--) {
    dp[i] = Math.max(dp[i], dp[i - W] + V)
  }
})

console.log(Math.max(...dp))