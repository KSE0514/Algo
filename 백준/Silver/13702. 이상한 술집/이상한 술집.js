const fs = require('fs')
var [[N, K], ...liqList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./13702input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
liqList.map((el, idx) => {
  liqList[idx] = el[0]
})
var maxV = Math.max(...liqList)

const biSearch = (st, ed) => {
  var maxValue = 0
  while (st <= ed) {
    var mid = Math.trunc((st+ed)/2)
    var cnt = 0
    liqList.forEach(liq => {
      cnt += Math.trunc(liq / mid)
    })

    if (cnt >= K) {
      maxValue = mid
      st = mid + 1
    } else {
      ed = mid - 1
    }
  }
  return maxValue
}

console.log(biSearch(0, maxV))