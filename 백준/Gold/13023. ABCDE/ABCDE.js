const fs = require('fs')
var [[N, M], ...relationships] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./13023input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

let result = 0

const dfs = (d, cur) => {
  if (d === 4) {
    result = 1
  }

  for (let nxt of G[cur]) {
    if (!visited[nxt]) {
      visited[nxt] = true
      dfs(d+1, nxt)
      visited[nxt] = false
    }
    if (result) {
      break
    }
  }
  if (result) {
    return 1
  }
  return 0
}

const G = Array.from({length: N}, () => [])
relationships.forEach(re => {
  const [a, b] = re
  G[a].push(b)
  G[b].push(a)
})

const visited = Array(N).fill(false)
for (let i = 0; i < N; i++) {
  visited[i] = true
  result = dfs(0, i)
  visited[i] = false
  if (result) {
    break
  }
}
console.log(result)