const fs = require('fs')
var [[N, M], timeList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./15810input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

const biSearch = (st, ed) => {
  var minTime = ed
  while (st <= ed) {
    var mid = Math.trunc((st + ed) / 2)
    var cnt = 0 // mid 시간안에 만들어지는 총 풍선의 개수
    timeList.forEach(time => {
      cnt += Math.trunc(mid/time)
    })
    if (cnt >= M) {
      // 시간안에 만들어야 하는 풍선 개수가 충족되면 => 시간 더 줄여보기
      minTime = mid
      ed = mid - 1
    } else {
      st = mid + 1
    }
  }
  return minTime
}

var maxTime = Math.max(...timeList)
console.log(biSearch(1, maxTime * M))
