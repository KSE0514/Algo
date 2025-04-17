const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? '/dev/stdin' : './10950input.txt').toString().trim().split('\n').map(el=>el.split(' ').map(Number))

const T = Number(input[0])

for (let i = 1; i<=T; i++) {
  const [A, B] = input[i]
  console.log(A+B)
}