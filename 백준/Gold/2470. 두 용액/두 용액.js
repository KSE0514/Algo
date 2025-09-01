const fs = require('fs')
var [[N], liquidList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "2470input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
liquidList.sort((a, b) => a - b)

var minV = Infinity
var solutions = []
const biSearch = (st, ed, cho1) => {
  while (st <= ed) {
    var mid = Math.trunc((st + ed) / 2)
    var minMixV = cho1 + liquidList[mid]
    if (Math.abs(minMixV) < Math.abs(minV)) {
      minV = minMixV
      solutions = [cho1, liquidList[mid]]
      if (minMixV === 0) {
        break
      }
    }
    if (minMixV < 0) {
      st = mid + 1
    } else {
      ed = mid - 1
    }
  }
}

for (let stIdx = 0; stIdx < N-1; stIdx ++) {
  biSearch(stIdx + 1, N-1, liquidList[stIdx])
  if (minV === 0) {
    break
  }
}

console.log(...solutions)