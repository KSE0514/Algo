const fs = require('fs')
var [[N, M], ...nodeInfo] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./1240input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

let result = 0
const dfs = (cur, d, goal) => {
  if (cur === goal) {
    result = d 
  }

  for (let nxtInfo of G[cur]) {
    const [nxt, nxtD] = nxtInfo
    if (!visited[nxt]) {
      visited[nxt] = true
      dfs(nxt, d + nxtD, goal)
      visited[nxt] = false
      if (result) {
        break
      }
    }
  }
  return d
}

const G = Array.from({length: N + 1}, () => [])
const visited = Array(N+1).fill(false)

let i = 0
for (i; i < N-1; i++) {
  const [n1, n2, d] = nodeInfo[i]
  G[n1].push([n2, d])
  G[n2].push([n1, d])
}

// 두 노드의 거리 구하기
for (i; i < N+M-1; i++) {
  const [A, B] = nodeInfo[i]
  result = 0
  if (A !== B) {
    visited[A] = true
    dfs(A, 0, B)
    visited[A] = false
  }
  console.log(result) // 출력
}