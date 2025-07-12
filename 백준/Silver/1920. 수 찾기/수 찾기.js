const fs = require('fs')
var input = fs.readFileSync(process.platform === "linux" ? "/dev/stdin" : "./1920input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
const [N] = input[0]
const [M] = input[2]
input[1] = input[1].sort((a, b) => a - b)

const biSearch = (num) => {
  var [st, ed] = [0, N-1]
  while (st <= ed) {
    var mid = Math.trunc((st + ed) / 2)
    if (input[1][mid] === num) {
      console.log(1)
      return
    }
    if (num < input[1][mid]) {
      ed = mid - 1
    } else {
      st = mid + 1
    }
  }
  console.log(0)
  return
}

input[3].forEach(num => {
  biSearch(num)
})