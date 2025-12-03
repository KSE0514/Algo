const fs = require('fs')
var [[T], ...tcList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./4196input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

class Q {
  constructor() {
    this.queue = []
    this.head = 0
  }

  enqueue(value) {
    this.queue.push(value)
  }

  dequeue() {
    return this.queue[this.head++]
  }

  isEmpty() {
    return this.queue.length === this.head
  }
}

let sccId, sccCnt, ST, finished, order

const tarjan = (u, G) => {
  order[u] = ++order[0]
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
    sccCnt ++
  }
  return parent
}

let tcIdx = 0
for (let tc = 0; tc < T; tc ++) {
  const [N, M] = tcList[tcIdx++]
  const G = Array.from({length: N + 1}, () => [])
  // order[0] = 0
  for (let i = 0; i < M; i++) {
    const [x, y] = tcList[tcIdx++]
    G[x].push(y)
  }
  
  sccId = Array.from({length: N + 1}, () => -1)
  order = Array.from({length: N + 1}, () => 0)
  finished = Array(N + 1).fill(false)
  ST = []
  sccCnt = 0

  for (let i = 1; i <= N; i++) {
    if (!order[i]) tarjan(i, G)
  }
  
  const sccIndegree = Array(sccCnt).fill(0)
  const sccG = Array.from({length: sccCnt}, () => new Set())

  for (let u = 1; u <= N; u++) {
    for (let v of G[u]) {
      const a = sccId[u]
      const b = sccId[v]
      if (a !== b) {
        if (!sccG[a].has(b)) {
          sccG[a].add(b)
          sccIndegree[b] ++
        }
      }
    }
  }

  let cnt = 0
  for (let i = 0; i < sccCnt; i++) {
    if (sccIndegree[i] === 0) cnt ++
  }

  console.log(cnt)
}
