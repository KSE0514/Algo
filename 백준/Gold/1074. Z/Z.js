const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./1074input.txt").toString().trim().split(' ').map(Number)

const [N, r, c] = input
let i = 0
const Z = (r1, r2, c1, c2) => {
  if (r2 - r1 === 2) {
    for (let row = r1; row < r2; row ++) {
      for (let col = c1; col < c2; col ++) {
        if (row == r && col == c) {
          console.log(i)
        } else {
          i++
        }
      }
    }
  } else {
    const midR = Math.floor((r1 + r2) / 2)
    const midC = Math.floor((c1 + c2) / 2)
    const sideLen = (r2 - r1) / 2
    if (r < midR) {
      if (c < midC) {
        // 1 번째 방문 조각
        Z(r1, midR, c1, midC)
      } 
      else {
        // 2 번째 방문 조각
        i += sideLen**2
        Z(r1, midR, midC, c2)
      }
    }
    else {
      if (c < midC) {
        // 3 번째 방문 조각
        i += (sideLen**2)*2
        Z(midR, r2, c1, midC)
      } 
      else {
        // 4 번째 방문 조각
        i += (sideLen**2)*3
        Z(midR, r2, midC, c2)
      }
    }
  }
}
Z(0, 2**N, 0, 2**N)