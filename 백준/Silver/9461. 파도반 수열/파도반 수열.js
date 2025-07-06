const fs = require('fs')
const input = fs.readFileSync(process.platform === "linux" ? "/dev/stdin" : "./9461input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

const [T] = input[0]
const dp = Array.from({length: 101}, () => Infinity)
dp[1] = 1
dp[2] = 1
dp[3] = 1
dp[4] = 2
dp[5] = 2
for (let n = 5; n <= 101; n++) {
  dp[n] = Math.min(dp[n], dp[n-1] + dp[n-5])
}

for (let tc = 1; tc <= T; tc ++) {
  const [N] = input[tc]
  console.log(dp[N])
}