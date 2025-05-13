const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./10951input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

input.forEach(el => {
  const [A, B] = el
  console.log(A+B)
})