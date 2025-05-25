const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "1874input.txt").toString().trim().split("\n").map(Number)

const ST = []
const result = []
var maxNum = 0
var popNum = 0
var flag = 0
for (let idx = 1; idx <= input[0]; idx++) {
  const num = input[idx]
  if (ST.indexOf(num) !== -1) {
    popNum = ST.pop()
    result.push('-')
    while (popNum !== num) {
      popNum = ST.pop()
      result.push('-')
    }
  } else {
    if (num > maxNum) {
      for (let n = maxNum+1; n <= num; n++) {
        ST.push(n)
        result.push('+')
        maxNum = Math.max(maxNum, n)
      }
      popNum = ST.pop()
      result.push('-')
    } else {
      flag = 1
      break
    }
  }
}

if (flag) {
  console.log('NO')
} else {
  for (s of result) {
    console.log(s)
  }
}