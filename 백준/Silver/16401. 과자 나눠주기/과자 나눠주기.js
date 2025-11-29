const fs = require('fs')
var [[M, N], snackLength] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./16401input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
var maxLen = Math.max(...snackLength)

const biSearch = (st, ed) => {
  var maxV = 0
  while (st <= ed) {
    var mid = Math.trunc((st + ed)/2)
    var cnt = 0 // mid 길이로 줄 경우, 나눠줄 수 있는 과자의 수
    for (let i = 0; i < N; i++) {
      cnt += Math.trunc(snackLength[i]/mid)
    }

    if (cnt >= M) {
      // 과자 길이 더 늘려보기
      maxV = mid
      st = mid + 1
    }
    else {
      ed = mid - 1
    }
  }
  return maxV
}

console.log(biSearch(1, maxLen))