const fs = require('fs')
var [[T], ...tcList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./3977input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

let idx = 0
let sccCnt, order, finished, ST, sccId, ordIdx

const tarjan = (u, G) => {
  order[u] = ++ordIdx
  let parent = order[u]
  ST.push(u)

  for (const v of G[u]) {
    if (!order[v]) {
      parent = Math.min(parent, tarjan(v, G))
    } else if (!finished[v]) {
      parent = Math.min(parent, order[v])
    }
  }

  if (parent === order[u]) {
    while (true) {
      let t = ST.pop()
      finished[t] = true
      sccId[t] = sccCnt
      if (t === u) break
    }
    sccCnt++
  }

  return parent
}

for (let tc = 0; tc < T; tc++) {
  const [N, M] = tcList[idx++] // 구역의 수, 지시한 움직임의 수

  // 그래프 완성하기
  const G = Array.from({length: N}, () => [])
  for (let m = 0; m < M; m++) {
    const [A, B] = tcList[idx++] // A -> B
    G[A].push(B)
  }

  order = Array(N).fill(0)
  finished = Array(N).fill(false)
  ST = []
  sccCnt = 0
  sccId = Array(N).fill(-1)
  ordIdx = 0
  for (let i = 0; i < N; i++) {
    if (!order[i]) tarjan(i, G)
  }
  
  const sccG = Array.from({length: sccCnt}, () => new Set())
  const sccIndegree = Array(sccCnt).fill(0)
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

  // 시작구역 찾기(sccIndegree가 0인 것)
  const start = []
  for (let i = 0; i < sccCnt; i++) {
    if (sccIndegree[i] === 0) start.push(i)
  }

  // 출력
  if (start.length !== 1) {
    console.log('Confused')
  } else {
    const stId = start[0]
    for (let i = 0; i < N; i++) {
      if (sccId[i] === stId) console.log(i)
    }
  }

  // 다음 테스트 케이스 출력 전 공백 출력
  if (tc !== T-1) {
    console.log()
    idx++
  }
}