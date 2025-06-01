const fs = require('fs')
var [N, numArray] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./14002input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

N = Number(N)
dp = Array.from({length: N}, () => 1)
for (let cur = 1; cur < N; cur ++) {
  for (let before = 0; before < cur; before++) {
    if (numArray[cur] > numArray[before]) {
      if (dp[before] + 1 > dp[cur]) {
        dp[cur] = dp[before] + 1
      }
    }
  }
}

var maxLen = Math.max(...dp)
var maxIdx = dp.indexOf(maxLen)
console.log(maxLen)
const result = []

while (maxLen) {
  if (dp[maxIdx] === maxLen) {
    result.push(numArray[maxIdx])
    maxLen --
  }
  maxIdx --
}
console.log(...result.reverse())
