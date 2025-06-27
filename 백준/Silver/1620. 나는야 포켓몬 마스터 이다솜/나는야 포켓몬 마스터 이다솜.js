const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./1620input.txt").toString().trim().split('\n').map(el => el.trim().split(' '))
const [N, M] = input[0].map(Number)

const nameKeyDic = {}
const numberKeyDic = {}
for (let i = 1; i <= N; i++) {
  nameKeyDic[input[i][0]] = i
  numberKeyDic[i] = input[i][0] 
}

for (let idx = N+1; idx < N + M + 1; idx++) {
  if (isNaN(input[idx][0])) {
    console.log(nameKeyDic[input[idx][0]])
  } else {
    console.log(numberKeyDic[input[idx][0]])
  }
}