const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./15681input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

const [N, R, Q] = input[0] // 정점 수, 루트 번호, 쿼리 수

const G = Array.from({length : N + 1}, () => [])
const subCount = Array.from({length: N+1}, () => 1)
for (let i = 1; i <= N-1; i++) {
  const [u, v] = input[i]
  G[v].push(u)
  G[u].push(v)
}

const postOrder = (before, cur) => {
  if (G[cur].length === 1 && G[cur][0] === before) {
    return
  } else {
    for (node of G[cur]) {
      if (node !== before) {
        postOrder(cur, node)
      }
    }
  }

  for (node of G[cur]) {
    if (node !== before) {
      subCount[cur] += subCount[node]
    }
  }
}
postOrder(R, R)
for (let q = N; q < N+Q; q++) {
  const nd = Number(input[q])
  console.log(subCount[nd])
}