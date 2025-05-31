const fs = require('fs')
var [N, numArray] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./11053input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
N = Number(N)

dp = Array.from({length: N}, () => 1)

for (let curIdx = 1; curIdx < N; curIdx++) {
  for (let beforeIdx = 0; beforeIdx < curIdx; beforeIdx++) {
    if (numArray[curIdx] > numArray[beforeIdx]) {
      if (dp[beforeIdx] + 1 > dp[curIdx]) {
        dp[curIdx] = dp[beforeIdx] + 1
      }
    }
  }
}
console.log(Math.max(...dp))