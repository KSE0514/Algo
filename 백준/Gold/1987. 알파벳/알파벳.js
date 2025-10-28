const fs = require('fs')
var [arrInfo, ...arr] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./1987input.txt").toString().trim().split('\n').map(el => el.trim())
const [R, C] = arrInfo.split(' ').map(Number)

const dr = [1, 0, -1, 0]
const dc = [0, 1, 0, -1]

var maxCnt = 0
const dfs = (stR, stC, visited) => {  
  maxCnt = Math.max(maxCnt, visited.size)

  for (let i = 0; i < 4; i++) {
    const newR = stR + dr[i]
    const newC = stC + dc[i]

    if (newR < 0 || newR >= R || newC < 0 || newC >= C) continue
    const nxt = arr[newR][newC]
    if (visited.has(nxt)) continue

    visited.add(nxt)
    dfs(newR, newC, visited)
    visited.delete(nxt)
  }
}

const visited = new Set([arr[0][0]])
dfs(0, 0, visited)
console.log(maxCnt)