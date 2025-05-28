const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./9251input.txt").toString().trim().split('\n').map(el => el.trim())

const str1 = [0, ...input[0]]
const str2 = [0, ...input[1]]

const N = input[0].length
const M = input[1].length
const LCS = Array.from({length: N+1}, () => Array.from({length: M+1}, () => 0))
var maxLength = 0

for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= M; j++) {
    if (str1[i] === str2[j]) {
      LCS[i][j] = LCS[i-1][j-1] + 1
      maxLength = Math.max(maxLength, LCS[i][j])
    } else {
      LCS[i][j] = Math.max(LCS[i-1][j], LCS[i][j-1])
    }
  }
}

console.log(maxLength)