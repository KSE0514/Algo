const fs = require('fs')
var [[N], requests, [budget]] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "2512input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

const biSearch = (st, ed) => {
  var maxAllocate = 0
  while (st <= ed) {
    var mid = Math.trunc((st + ed) / 2) // 임시 배정 상한값
    var checkSum = 0 // 배정 예산 합
    for (req of requests) {
      if (req <= mid) {checkSum += req}
      else {checkSum += mid}
    }
    if (checkSum <= budget) {
      maxAllocate = mid
      st = mid + 1 // 더 큰 배정 상한값 찾아보기
    } else {
      ed = mid - 1 // 더 작은 배정 상한값 찾기
    }
  }
  return maxAllocate
}

var reqSum = 0
for (req of requests) {
  reqSum += req
}

// 요청의 합이 예산을 초과하지 않는다면 요청 중 가장 큰 값 출력
if (reqSum <= budget) {
  console.log(Math.max(...requests))
} else {
  // 요청의 합이 예산을 초 과할 경우 상한 값 계산(이분탐색)
  console.log(biSearch(1, budget))
}