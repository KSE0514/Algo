const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./1389input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
const [N, M] = input[0]
const floyd = Array.from({length: N + 1}, () => Array.from({length: N+1}, () => Infinity))

// 친구 관계 연결하기(1단계 만에 연결되는 친구들)
for (let i = 1; i <= M; i++) {
  const [A, B] = input[i]
  floyd[A][B] = 1
  floyd[B][A] = 1
}

// 자기 자신 0으로 업데이트
for (let i = 1; i <= N; i++) {
  floyd[i][i] = 0
}

// k를 중간 경로로 연결되는 친구들 업데이트
for (let k = 1; k <= N; k++) {
  for (let r = 1; r <= N; r++) {
    if (r == k) continue
    for (let c = 1; c <= N; c++) {
      if (c == k || c == r) continue
      floyd[r][c] = Math.min(floyd[r][c], floyd[r][k] + floyd[k][c])
    }
  }
}

var minSum = Infinity // 가장 작은 값의 케빈 베이컨 수
var result = 1 // 케빈 베이컨 수가 가장 작은 사람
for (let i = 1; i <= N; i++) {
  const sum = floyd[i].slice(1).reduce((ac, cur) => ac+cur, 0)
  if (sum < minSum) {
    minSum = sum
    result = i
  }
}
console.log(result)