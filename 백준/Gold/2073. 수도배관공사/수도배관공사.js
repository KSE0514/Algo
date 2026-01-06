const fs = require('fs')
var [[D, P], ...pipeList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./2073input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

const dp = Array(D+1).fill(0)

pipeList.forEach(pipe => {
  const [L, C] = pipe // 길이, 용량
  dp[L] = Math.max(dp[L], C)
  for (let len = D; len >= L; len--) {
    dp[len] = Math.max(dp[len], Math.min(dp[len-L], C))
  }
})

console.log(dp[D])