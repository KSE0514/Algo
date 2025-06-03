const fs = require('fs')
var [N, numArray] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./11054input.txt").toString().split('\n').map(el => el.split(' ').map(Number))
N = Number(N)

const dp1 = Array.from({length: N}, () => 1)
const dp2 = Array.from({length: N}, () => 1)

for (let cur = 1; cur < N; cur ++) {
  for (let before = 0; before < cur; before ++) {
    if (numArray[cur] > numArray[before]) {
      if (dp1[before] + 1 > dp1[cur]) {
        dp1[cur] = dp1[before] + 1
      }
    }
  }
}

for (let cur = N-2; cur >= 0; cur--) {
  for (let before = N-1; before > cur; before--) {
    if (numArray[cur] > numArray[before]) {
      if (dp2[before] + 1 > dp2[cur]) {
        dp2[cur] = dp2[before] + 1
      }
    }
  }
}

var maxLen = dp1[0] + dp2[0]
for (let i = 1; i < N; i++) {
  maxLen = Math.max(maxLen, dp1[i] + dp2[i])
}
console.log(maxLen - 1)