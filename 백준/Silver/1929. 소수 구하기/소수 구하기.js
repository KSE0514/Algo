const fs = require('fs')
var [M, N] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./1929input.txt").toString().trim().split(' ').map(Number)
const numArr = Array.from({length: N + 1}, () => true)

numArr[0] = false
numArr[1] = false
for (let i = 2; i < M; i++) {
  var c1 = 2
  while (i*c1 <= N) {
    numArr[i*c1] = false
    c1++
  }
}

for (let i = M; i <= N; i++) {
  var c2 = 2
  if (numArr[i]) {
    console.log(i)
    while (i*c2 <= N) {
      numArr[i*c2] = false
      c2++
    }
  }
}