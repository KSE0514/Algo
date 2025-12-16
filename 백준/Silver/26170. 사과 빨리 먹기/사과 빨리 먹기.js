const fs = require('fs')
var arr = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./26170input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
const [stR, stC] = arr.pop()

var minLen = Infinity
const D = [1, 0, -1, 0]
const dfs = (d, curR, curC, lenSum) => {
  if (lenSum >= minLen) return

  if (d === 3) {
    minLen = Math.min(minLen, lenSum)
    return
  }

  for (let i = 0; i < 4; i++) {
    var newR = curR + D[i]
    var newC = curC + D[(i+1)%4]
    if (newR < 0 || newR >= 5 || newC < 0 || newC >= 5) continue
    if (arr[newR][newC] !== -1) {
      var t = arr[newR][newC]
      arr[newR][newC] = -1
      t === 1? dfs(d+1, newR, newC, lenSum + 1) : dfs(d, newR, newC, lenSum + 1)
      arr[newR][newC] = t
    }
  }
}

let startApple = 0
if (arr[stR][stC] === 1) startApple = 1
arr[stR][stC] = -1
dfs(startApple, stR, stC, 0)

// 출력
if (minLen === Infinity) {
  console.log(-1)
} else {
  console.log(minLen)
}