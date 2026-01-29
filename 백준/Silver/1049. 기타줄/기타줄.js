const fs = require('fs')
const [[N, M], ...lineList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./1049input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

const MAX_SIZE = N + 6
const dp = Array(MAX_SIZE).fill(Infinity)
dp[0] = 0
lineList.forEach(line => {
  const [packCost, oneCost] = line // 패키지 가격, 낱개 가격
  for (let i = 6; i < MAX_SIZE; i++) {
    dp[i] = Math.min(dp[i], dp[i-6] + packCost)
  }
  for (let i = 1; i < MAX_SIZE; i++) {
    dp[i] = Math.min(dp[i], dp[i-1] + oneCost)
  }
})

console.log(Math.min(...dp.slice(N)))