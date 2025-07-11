const fs = require('fs')
var input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./11780input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
const [n] = input[0] // 도시 개수
const [m] = input[1] // 버스 개수
const floyd = Array.from({length: n + 1}, () => Array.from({length: n+1 }, () => Infinity)) // 최단 거리 저장
const path = Array.from({length: n + 1}, () => Array.from({length: n+1 }, () => [])) // 최단 경로 저장

// 자기 자신 0으로 업데이트
for (let i = 1; i <= n; i ++) {
  floyd[i][i] = 0
}
// 버스 최단 노선 업데이트
for (let i = 2; i < m + 2; i++) {
  const [a, b, c] = input[i]
  if (c < floyd[a][b]) {
    floyd[a][b] = c
    path[a][b] = [a, b]
  }
}

// 플로이드
for (let k = 1; k <= n; k++) {
  for (let r = 1; r <= n; r++) {
    if (r === k) continue
    for (let c = 1; c <= n; c++) {
      if (c === k || c === r) continue
      if (floyd[r][k] + floyd[k][c] < floyd[r][c]) {
        // 최단 거리 업데이트
        floyd[r][c] = floyd[r][k] + floyd[k][c]
        // 최단 거리가 되게하는 경로 업데이트
        path[r][c] = [...path[r][k] , ...path[k][c].slice(1)]
      }
    }
  }
}

// 출력1. 최단거리
for (let i = 1; i <= n; i++) {
  floyd[i] = floyd[i].map(v => v === Infinity ? 0 : v)
  console.log(...floyd[i].slice(1))
}
// 출력2. 경로 길이&최단 경로
for (let r = 1; r <= n; r++) {
  for (let c = 1; c <= n; c++) {
    if (floyd[r][c] === 0) {
      console.log(0)
    } else {
      console.log(path[r][c].length, ...path[r][c])
    }
  }
}