const fs = require('fs')
const { join } = require('path')
const input = fs.readFileSync(process.platform === "linux" ? "/dev/stdin" : './2675input.txt').toString().trim().split('\n').map(el => el.trim().split(' '))

// console.log(input)
const T = Number(input[0])
// console.log(T, typeof(T))
for (let i = 1; i<=T; i++) {
  const [len, st] = input[i]
  const result = []
  for (s of st) {
    // console.log(s)
    for (let cnt = 0; cnt < Number(len); cnt++){
      result.push(s)
    }
  }
  console.log(result.join(''))
}