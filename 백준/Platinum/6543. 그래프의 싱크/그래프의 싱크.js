const fs = require('fs')
var input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./6543input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
input.pop() // 맨 뒤에 0 제거
const tcLen = input.length

let sccCnt, sccId, ST, order, finished
let ordIdx

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
      const t = ST.pop()
      finished[t] = true
      sccId[t] = sccCnt
      if (t === u) break
    }
    sccCnt++
  }

  return parent
}

for (let tc = 0; tc < tcLen; tc +=2) {
  const [N, M] = input[tc]
  const edgeList = input[tc+1]

  const G = Array.from({length: N+1}, () => [])
  // 간선이 있을 경우에만 그래프 채우기
  if (M > 0) {
    const edgeLen = edgeList.length
    for (let idx = 0; idx < edgeLen; idx += 2) {
      const V = edgeList[idx]
      const W = edgeList[idx+1]
      G[V].push(W)
    }
  }

  // SCC 분리
  sccCnt = 0
  sccId = Array(N+1).fill(-1)
  ST = []
  order = Array(N+1).fill(0)
  finished = Array(N+1).fill(false)
  ordIdx = 0
  for (let i = 1; i <= N; i++) {
    if (!order[i]) tarjan(i, G)
  }

  // 전출차수의 값이 0인 SCC에 속한 노드들이 G의 싱크
  const sccOutdegree = Array(sccCnt).fill(0)
  const sccG = Array.from({length: sccCnt}, () => new Set())
  for (let u = 1; u <= N; u++) {
    const a = sccId[u]
    for (let v of G[u]) {
      const b = sccId[v]
      if (a !== b && !sccG[a].has(b)) {
        sccG[a].add(b)
        sccOutdegree[a] += 1
      }
    }
  }

  // 전출차수가 0인 SCC만 sinkSet에 저장
  const sinkSet = new Set()
  for (let sccNum = 0; sccNum < sccCnt; sccNum++) {
    if (sccOutdegree[sccNum] === 0) sinkSet.add(sccNum)
  }

  // 싱크인 노드들 찾기
  const sinkList = []
  for (let i = 1; i <= N; i++) {
    if (sinkSet.has(sccId[i])) sinkList.push(i) 
  }

  //출력
  console.log(...sinkList)
}