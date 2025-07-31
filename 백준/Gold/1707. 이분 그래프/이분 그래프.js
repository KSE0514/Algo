const fs = require('fs')
var [[K], ...tcList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./1707input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

class ST {
  constructor() {
    this.stack = []
    this.head = -1
  }

  stPush(value) {
    this.stack.push(value)
    this.head ++
  }

  stPop() {
    this.head --
    return this.stack.pop()
  }

  isEmpty() {
    return this.head === -1
  }
}

let idx = 0
for (let tc = 0; tc < K; tc++) {
  const [V, E] = tcList[idx]
  const G = Array.from({length: V + 1}, () => [])
  const visited = Array(V + 1).fill(-1)  // -1: 방문 안함, 0/1: 그룹 번호
  const checkBi = (start) => {
    const st = new ST()
    st.stPush(start)
    visited[start] = 0
    while (!st.isEmpty()) {
      var curV = st.stPop()
      for (let nIdx = 0; nIdx < G[curV].length; nIdx++) {
        var nxtV = G[curV][nIdx]
        if (visited[nxtV] === -1) {
          visited[nxtV] = 1 - visited[curV] // 현재와 다른 색
          st.stPush(nxtV)
        } else if (visited[nxtV] === visited[curV]) {
          return false // 인접한 두 정점 색이 같으면 이분 그래프 아님
        }
      }
    }
    return true
  }
  for (let i = 0; i < E; i++) {
    idx++
    const [u, v] = tcList[idx]
    G[u].push(v)
    G[v].push(u) 
  }

  let flag = true // 이분 그래프가 아니면(사이클이 생기면) false, 이분그래프이면 true
  for (let ver = 1; ver <= V; ver++) {
    if (visited[ver] === -1) {
      if (!checkBi(ver)) {
        flag = false
        break
      }
    }
  }
  console.log(flag ? 'YES' : 'NO')
  idx ++
}