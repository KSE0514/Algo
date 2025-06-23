const fs = require('fs')
var input = fs.readFileSync(process.platform === "linux" ? "/dev/stdin" : "./2739input.txt").toString().trim().split('').map(Number)
for (let n = 1; n <= 9; n++) {
  console.log(`${input[0]} * ${n} = ${input[0]*n}`)
}