const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./9252input.txt").toString().trim().split('\n').map(el => el.trim())

const N = input[0].length
const M = input[1].length
const str1 = [0, ...input[0]]
const str2 = [0, ...input[1]]
const LCS = Array.from({length: N+1}, () => Array.from({length: M+1}, () => 0))
var maxLength = 0
var lastPosition = [0, 0]

for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= M; j++) {
    if (str1[i] === str2[j]) {
      LCS[i][j] = LCS[i-1][j-1] + 1
      if (LCS[i][j] > maxLength) {
        maxLength = LCS[i][j]
        lastPosition = [i, j]
      }
    } else {
      LCS[i][j] = Math.max(LCS[i-1][j], LCS[i][j-1])
    }
  }
}

const result = []
const FindLCS = (num, [curR, curC]) => {
  if (num === 0) {
    return
  }
  if (LCS[curR-1][curC] === num) {
    FindLCS(num, [curR-1, curC])
  } else if (LCS[curR][curC-1] === num) {
    FindLCS(num, [curR, curC-1])
  } else {
    result.push(str1[curR])
    FindLCS(num-1, [curR-1, curC-1])
  }
}

console.log(maxLength)
if (maxLength !== 0) {
  FindLCS(maxLength, lastPosition)
  result.reverse()
  console.log(result.join(''))
}