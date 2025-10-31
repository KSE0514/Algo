const fs = require('fs')
var [[n, m], rankList, ...praiseInfo] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./14267input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

const G = Array.from({length: n+1}, () => [])
rankList.forEach((pre, idx) => {
  if (pre !== -1) {
    G[pre].push(idx+1)
  }
})
const praise = Array(n+1).fill(0)

const dfs = (cur) => {
  for (let nxt of G[cur]) {
    praise[nxt] += praise[cur]
    dfs(nxt)
  }
}

for (let j = 0; j < m; j++) {
  const [i, w] = praiseInfo[j] // 칭찬받을 직원 번호, 칭찬 수치
  praise[i] += w
}

dfs(1)

console.log(...praise.slice(1))