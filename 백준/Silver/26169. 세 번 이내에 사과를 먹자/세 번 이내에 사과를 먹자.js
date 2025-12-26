const fs = require('fs')
var input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./26169input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
const [row, col] = input.pop()
var result = 0
const D = [1, 0, -1, 0]
const dfs = (d, curR, curC, apple) => {
  if (d === 3) {
    if (apple >= 2) {
      result = 1
    }
    return
  }
  for (let i = 0; i < 4; i++) {
    var newR = curR + D[i]
    var newC = curC + D[(i+1)%4]
    if (newR < 0 || newR >= 5 || newC < 0 || newC >= 5) continue
    if (input[newR][newC] !== -1) {
      var nxtApple = input[newR][newC]
      input[newR][newC] = -1
      dfs(d+1, newR, newC, apple+nxtApple)
      input[newR][newC] = nxtApple
    }
  }

  if (result) {
    return
  }
}

var startApple = input[row][col]
input[row][col] = -1
dfs(0, row, col, startApple)
console.log(result)