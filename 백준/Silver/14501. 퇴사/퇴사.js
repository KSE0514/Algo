const fs = require('fs')
const [[N], ...counselList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./14501input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

let maxV = 0
const dfs = (stIdx, midSum) => {
  if (stIdx > counselList.length) {
    return
  }

  for (let i = stIdx; i < counselList.length; i++) {
    const [T, P] = counselList[i] // 걸리는 기간, 받을 수 있는 금액
    if (i + T <= counselList.length) {
      maxV = Math.max(maxV, midSum + P)
      dfs(i + T, midSum + P)
    }
  }
}

dfs(0, 0)
console.log(maxV)