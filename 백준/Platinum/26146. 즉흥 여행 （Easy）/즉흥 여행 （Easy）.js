const fs = require('fs')
var [[N, M], ...flightInfo] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./26146input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

const G = Array.from({length: N + 1}, () => [])
flightInfo.forEach(flightI => {
  const [v, w] = flightI
  G[v].push(w)
})
var sccCnt = 0
const order = Array(N+1).fill(0)
const finished = Array(N+1).fill(false)
const ST = []

let idx = 0
let parent
const tarjan = (u) => {
  order[u] = ++idx
  parent = order[u]
  ST.push(u)

  for (const v of G[u]) {
    if (!order[v]) {
      parent = Math.min(parent, tarjan(v))
    } else if (!finished[v]) {
      parent = Math.min(parent, order[v])
    }
  }

  if (parent === order[u]) {
    while (true) {
      const t = ST.pop()
      finished[t] = true
      if (t === u) break
    }
    sccCnt++
  }
  return parent
}

for (let i = 1; i <= N; i++) {
  if (!order[i]) {
    tarjan(i)
  }
}

// 출력
sccCnt === 1 ? console.log("Yes") : console.log("No")