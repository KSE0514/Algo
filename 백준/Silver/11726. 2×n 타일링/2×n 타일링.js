const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./11726input.txt").toString().trim()


n = Number(input)
dp = Array.from({length: n + 1}, () => 1)

for (let i = 2; i <= n; i++) {
  dp[i] = (dp[i-1] + dp[i-2]) % 10007
}

console.log(dp[n])