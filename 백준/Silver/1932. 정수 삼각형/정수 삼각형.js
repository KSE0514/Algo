const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./1932input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

const n = input[0][0]
const triangle = input.slice(1)

for (let r = n - 2; r >= 0; r--) {
  for (let c = 0; c <= r; c++) {
    triangle[r][c] += Math.max(triangle[r+1][c], triangle[r+1][c+1])
  }
}

console.log(triangle[0][0])