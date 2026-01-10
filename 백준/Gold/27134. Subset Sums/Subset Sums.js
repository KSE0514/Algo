const fs = require('fs')
var [N] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./27134input.txt").toString().trim().split(' ').map(Number)

var sumV = 0
for (let n = 1; n <= N; n++) {
  sumV += n
}

// 요소 합이 같은 두 개의 집합으로 분리할 수 있는 경우: 1 ~ N의 합이 짝수일 경우
if (sumV % 2 === 0) {
  const halfSumV = Math.floor(sumV / 2)
  const dp = Array(halfSumV+1).fill(0) // dp[idx]: 1 ~ N의 조합으로 합이 idx를 만들 수 있는 가짓수
  dp[0] = 1
  for (let n = 1; n <= N; n++) {
    for (let tarV = halfSumV; tarV >= n; tarV--) {
      dp[tarV] += dp[tarV - n]
    }
  }

  // '요소 합이 같은 두 개의 집합으로 분리할 수 있는 경우' 한 개 당 '요소 합이 halfSumV이 되는 서로다른 집합'의 가짓수가 2개씩 생성되므로 최종 출력은 2로 나눠주기
  console.log(Math.floor(dp[halfSumV] / 2))
} else {
  console.log(0)
}