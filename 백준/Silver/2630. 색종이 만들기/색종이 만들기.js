const fs = require('fs')
var input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./2630input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

const N = Number(input[0])
input = input.slice(1)

var blue = 0
var white = 0
const check = (r1, r2, c1, c2) => {
  const start = input[r1][c1]
  flag = 0
  for (let row = r1; row < r2; row ++) {
    for (let col = c1; col < c2; col ++) {
      if (start !== input[row][col]) {
        flag = 1
        break
      }
      if (row === r2-1 && col === c2 - 1 && start === input[row][col]) {
        if (start === 1) {
          blue += 1
        } else {
          white += 1
        }
      }
    }
    if (flag) {
      break
    }
  }
  if (flag) {
    const midR = Math.trunc((r1+r2)/2)
    const midC = Math.trunc((c1+c2)/2)
    check(r1, midR, c1, midC)
    check(r1, midR, midC, c2)
    check(midR, r2, c1, midC)
    check(midR, r2, midC, c2)
  }
}

check(0, N, 0, N)
console.log(white)
console.log(blue)