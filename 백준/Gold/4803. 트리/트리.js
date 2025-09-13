const fs = require('fs')
var input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./4803input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

let idx = 0
var tc = 1
while (true) {
  const [N, M] = input[idx++]
  if (N === 0 && M === 0) break
  const G = Array.from({length: N + 1}, () => [])
  const visited = Array.from({length: N + 1}, () => false)

  // 사이클 존재 여부 체크 & 그래프 방문
  const TreeCheck = (par, cur) => {
    visited[cur] = true
    G[cur].forEach(nxt => {
      if (nxt !== par) {
        if (!visited[nxt]) {
          TreeCheck(cur, nxt)
        } else {
          isCycle = 1
        }
      }
    })
  }

  // 무방향 그래프
  for (let i = 0; i < M; i++) {
    const [n1, n2] = input[idx++]
    G[n1].push(n2)
    G[n2].push(n1)
  }

  var T = 0 // 트리 개수
  for (let i = 1; i <= N; i++) {
    var isCycle = 0 // 사이클 존재 여부 플래그
    if (!visited[i]) {
      TreeCheck(-1, i) // i와 연결된 모든 노드 방문하며 트리인지 체크
      if (!isCycle) T++ // 사이클이 만들어진 적이 없다면 트리 개수 증가
    }
  }

  // 출력
  if (T > 1) {
    console.log(`Case ${tc}: A forest of ${T} trees.`)
  } else if (T === 1) {
    console.log(`Case ${tc}: There is one tree.`)
  } else {
    console.log(`Case ${tc}: No trees.`)
  }
  tc++
}