const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./11727input.txt").toString().trim().split(' ').map(Number)
const [N] = input

const dp = Array.from({length: N+1}, () => 1)
if (N === 1) {
  console.log(1)
} else {
  for (let i=2; i<= N; i++) {
    dp[i] = (dp[i-1] + dp[i-2] * 2) % 10007
  }
  console.log(dp[N])
}