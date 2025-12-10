const fs = require('fs')
var [[N, M], ...linkList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./15783input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

// 그래프 완성하기
const G = Array.from({length: N}, () => [])
linkList.forEach(link => {
  const [A, B] = link
  G[A].push(B)
})

// SCC 세팅
let orIdx = 0
const sccId = Array(N).fill(-1)
const order = Array(N).fill(0)
const finished = Array(N).fill(false)
const ST = []
let sccCnt = 0

const tarjan = (u) => {
  order[u] = ++orIdx
  let parent = order[u]
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
      sccId[t] = sccCnt
      if (t === u) break
    }
    sccCnt++
  }

  return parent
}

// SCC 분리
for (let i = 0; i < N; i++) {
  if (!order[i]) tarjan(i)
}

// SCC단위로 그래프 축소
const sccIndegree = Array(sccCnt).fill(0)
const sccG = Array.from({length: sccCnt} , () => new Set())

for (let u = 0; u < N; u++) {
  for (let v of G[u]) {
    const a = sccId[u]
    const b = sccId[v]
    if (a !== b && !sccG[a].has(b)) {
      sccG[a].add(b)
      sccIndegree[b]++
    }
  }
}

// 생산해야 할 최소의 바이러스 개수 카운트
var virus = 0
for (let i = 0; i < sccCnt; i++) {
  if (sccIndegree[i] === 0) virus++
}

// 출력
console.log(virus)