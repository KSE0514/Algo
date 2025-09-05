const fs = require('fs')
var [p1, p2, p3] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./11758input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

// 외적
const cross = (p2[0]-p1[0]) * (p3[1]-p1[1]) - (p2[1]-p1[1]) * (p3[0]-p1[0])

if (cross > 0) {
  console.log(1)
} else if (cross < 0) {
  console.log(-1)
} else {
  console.log(0)
}