const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./10952input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

input.forEach(el => {
  const [A, B] = el
  if (A+B) {
    console.log(A+B)
  }
})