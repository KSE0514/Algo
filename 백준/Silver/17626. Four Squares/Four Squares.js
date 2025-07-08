const fs = require('fs')
const [N] = fs.readFileSync(process.platform === "linux" ? "/dev/stdin" : "./17626input.txt").toString().trim().split(' ').map(Number)

const dp = Array.from({length: N+1}, () => Infinity)
if (Math.trunc(N**(1/2)) === N**(1/2)) {
  console.log(1)
} else {
  for (let i = 1; i <= Math.trunc(N**(1/2)); i++) {
    dp[i**2] = 1
  }
  for (let n = 2; n <= N; n++) {
    for (let k = 1; k * k <= n; k++) {
      dp[n] = Math.min(dp[n], dp[n - k*k] + 1)
    }
  }
  console.log(dp[N])
}