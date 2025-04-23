const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./9095input.txt").toString().trim().split('\n').map(el => el.trim())

const dp = Array.from({length: 12}, () => 1)
dp[2] = 2
dp[3] = 4

for (let i = 4; i<= 11; i++) {
  dp[i] = dp[i-1] + dp[i-2] + dp[i-3]
}

for (let idx = 1; idx <= Number(input[0]); idx++) {
  console.log(dp[Number(input[idx])])
}