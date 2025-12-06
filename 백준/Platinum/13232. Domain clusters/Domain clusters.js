const fs = require('fs')
var [[D], [L], ...linkList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./13232input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

const G = Array.from({length: D + 1}, () => [])
const order = Array(D + 1).fill(0)
const finished = Array(D + 1).fill(false)
let sccCnt = 0
const ST = []

// 그래프 완성
linkList.forEach(link => {
  const [A, B] = link
  G[A].push(B)
})

const subsetSizeDic = {} // 각 부분집합의 크기를 담을 dic, scc번호(key) - scc번호에 해당되는 부분집합의 사이즈
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

  let cnt = 0
  if (parent == order[u]) {
    while (true) {
      var t =  ST.pop()
      finished[t] = true
      cnt ++
      if (t == u) break
    }
    subsetSizeDic[sccCnt] = cnt // sccID가 sccCnt인 부분집합의 사이즈 저장
    sccCnt++
  }
  return parent
}

for (let i = 1; i <= D; i++) {
  if (!order[i]) tarjan(i)
}


const subsetSizeList = Object.values(subsetSizeDic)
console.log(Math.max(...subsetSizeList)) // 출력