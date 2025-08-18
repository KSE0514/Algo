const fs = require('fs')
var [[n, m, r], items, ...rootInfo] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./14938input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
items = [0, ...items]
const floyd = Array.from({length: n + 1}, () => Array.from({length: n + 1}, () => Infinity))

rootInfo.forEach(root => {
  floyd[root[0]][root[1]] = Math.min(floyd[root[0]][root[1]], root[2])
  floyd[root[1]][root[0]] = Math.min(floyd[root[1]][root[0]], root[2])
})

// 자기자신 거리 0
for (let i = 1; i <= n; i++) {
  floyd[i][i] = 0
}

// 플로이드_i에서 k를 거쳐 j까지 가기까지의 최소 거리
for (let k = 1; k <= n; k++) {
  for (let i = 1; i <= n; i++) {
    if (i === k) continue
    for (let j = 1; j <= n; j++) {
      if (i === j || k === j) continue
      floyd[i][j] = Math.min(floyd[i][j], floyd[i][k] + floyd[k][j])
      floyd[j][i] = Math.min(floyd[j][i], floyd[j][k] + floyd[k][i])
    }
  }
}

var maxResult = 0
// start 지역에 떨어져서 수색범위 m안에 있는 아이템을 모았을 때의 최댓값 구하기
for (let start = 1; start <= n; start++) {
  var itemMidSum = 0
  for (let i = 1; i <= n; i++) {
    if (floyd[start][i] <= m) {
      itemMidSum += items[i]
    }
  }
  if (itemMidSum > maxResult) {
    maxResult = itemMidSum
  }
}
// 출력
console.log(maxResult)