const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? '/dev/stdin' : './9012input.txt').toString().trim().split('\n').map(el => el.trim())

const T = Number(input[0])

// console.log(T, input)
for (let i = 1; i<=T; i++) {
  const ST = []
  let isValid = true
  for (let v of input[i]) {
    if (v === '(') {
      ST.push(v)
    } else {
      if (ST.length === 0) {
        isValid = false
        break
      } else {
        ST.pop()
      }
    }
  }
  console.log(isValid&&ST.length === 0 ? "YES" : "NO")
}