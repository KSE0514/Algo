const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? '/dev/stdin' : './30802input.txt').toString().trim().split('\n').map(el => el.split(' ').map(Number))

const N = Number(input[0])
const [T, P] = input[2]

let min_cnt = 0
input[1].forEach(size => {
  min_cnt += Math.trunc(size/T)
  if (size % T !== 0) {
    min_cnt += 1
  }
})
console.log(min_cnt)
console.log(Math.trunc(N/P), N%P)