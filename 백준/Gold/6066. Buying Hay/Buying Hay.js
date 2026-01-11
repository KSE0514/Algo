const fs = require('fs')
var [[N, H], ...hayList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./6066input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

const MAXSIZE = H + 50000
const dp = Array(MAXSIZE + 1).fill(Infinity) // idx의 건초를 살 수 있는 최소 금액
dp[0] = 0
hayList.forEach(hay => {
  var [P, C] = hay
  for (let p = P; p <= MAXSIZE; p++) {
    dp[p] = Math.min(dp[p], dp[p-P] + C)
  }
})
console.log(Math.min(...dp.slice(H)))