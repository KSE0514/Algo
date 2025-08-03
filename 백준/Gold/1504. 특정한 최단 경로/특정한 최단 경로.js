const fs = require('fs')
var [[N, E], ...roodList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./1504input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
var [v1, v2] = roodList[E] // 꼭 지나야 하는 정점
roodList.pop()

const floyd = Array.from({length: N + 1}, () => Array.from({length: N + 1}, () => Infinity))

// 1-1. 주어진 간선으로 a부터 b, b부터 a까지의 최단 경로 채우기
roodList.forEach(root => {
  const [a, b, c] = root
  floyd[a][b] = Math.min(floyd[a][b], c)
  floyd[b][a] = Math.min(floyd[b][a], c)
})

// 1-2. 자기자신까지의 거리 0으로 채우기
for (let i = 1; i <= N; i++) {
  floyd[i][i] = 0
}

// 1-3. 플로이드 워샬(i부터 j까지 갈 때 k를 경유하여 가는 경로의 최단거리 업데이트)
for (let k = 1; k <= N; k ++) {
  for (let i = 1; i <= N; i ++) {
    if (k === i) continue
    for (let j = 1; j <= N; j++) {
      if (k === j || i === j) continue
      floyd[i][j] = Math.min(floyd[i][j], floyd[i][k] + floyd[k][j])
    }
  }
}

// 출력
if (floyd[v1][v2] === Infinity || floyd[1][v1] === Infinity || floyd[1][v2] === Infinity || floyd[v1][N] === Infinity || floyd[v2][N] === Infinity) {
  console.log(-1)
} else {
  var v1First = floyd[1][v1] + floyd[v1][v2] + floyd[v2][N]
  var v2First = floyd[1][v2] + floyd[v2][v1] + floyd[v1][N]
  var minV = Math.min(v1First, v2First)
  if (minV === Infinity) {
    console.log(-1)
  } else {
    console.log(minV)
  }
}