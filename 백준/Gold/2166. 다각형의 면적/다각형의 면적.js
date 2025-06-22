const fs = require('fs')
var input = fs.readFileSync(process.platform === "linux" ? "/dev/stdin" : "./2166input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
const [N] = input[0]
input = input.slice(1)

var S = 0
for (let n = 0; n < N; n++) {
  const [x1, y1] = input[n]
  const [x2, y2] = input[(n+1) % N]
  S += x1*y2 - y1*x2
}

console.log(Math.abs(S/2).toFixed(1))