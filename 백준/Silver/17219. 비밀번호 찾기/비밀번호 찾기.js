const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./17219input.txt").toString().trim().split('\n').map(el => el.trim().split(' '))
const [N, M] = input[0].map(Number)
const passwordDic = {}
for (let idx = 1; idx <= N; idx++) {
  passwordDic[input[idx][0]] = input[idx][1]
}
for (let i = N+1; i < N+M+1; i++) {
  console.log(passwordDic[input[i]])
}