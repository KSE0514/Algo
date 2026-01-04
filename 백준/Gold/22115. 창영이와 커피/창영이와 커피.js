const fs = require('fs')
var [[N, K], coffeList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./22115input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

const dp = Array(K+1).fill(Infinity)
dp[0] = 0

coffeList.forEach(cof => {
  dp[cof] = 1
  for (let caff = K; caff >= cof; caff--) {
    dp[caff] = Math.min(dp[caff], dp[caff - cof] + dp[cof])
  }
})

if (dp[K] === Infinity) {
  console.log(-1)
} else {
  console.log(dp[K])
}