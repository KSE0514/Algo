const fs = require('fs')
var input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./4781input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
input.pop()

let idx = 0
while (idx < input.length) {
  var [N, M] = input[idx++]
  M = Math.round(M * 100)
  const dp = new Int32Array(M + 1)

  for (let i = 0; i < N; i++) {
    var [c, p] = input[idx++] // 칼로리, 가격
    p = Math.round(p * 100)
    for (let money = p; money <= M; money++) {
      dp[money] = Math.max(dp[money], dp[money - p] + c)
    }
  }

  console.log(dp[M])
}