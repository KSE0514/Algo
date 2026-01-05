const fs = require('fs')
var [[N, T], ...proList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./29704input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

const dp = Array(T+1).fill(0) // idx일 내에 풀 수 있는 문제의 최대 벌금 합
var sumDay = 0
var sumFine = 0

proList.forEach(pro => {
  const day = pro[0]
  const fine = pro[1]
  sumDay += day
  sumFine += fine
  for (let d = T; d >= day; d--) {
    dp[d] = Math.max(dp[d], dp[d-day] + fine)
  }
})

var result = sumFine - dp[T] // 내야하는 벌금의 최솟값
if (result) {
  console.log(result)
} else {
  console.log(0)
}