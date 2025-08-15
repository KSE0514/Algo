const fs = require('fs')
var [[N, M], ...arr] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./11048input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

const dp = Array.from({length: N}, () => Array.from({length: M}, () => 0))

for (let r = 0; r < N; r++) {
  for (let c = 0; c < M; c++) {
    const beTop = r > 0 ? dp[r - 1][c] : 0
    const beLeft = c > 0 ? dp[r][c - 1] : 0
    const beDiag = r > 0 && c > 0 ? dp[r - 1][c - 1] : 0
    dp[r][c] = Math.max(beTop, beLeft, beDiag) + arr[r][c]
  }
}

console.log(dp[N-1][M-1])