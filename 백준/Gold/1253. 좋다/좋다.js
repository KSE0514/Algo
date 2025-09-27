const fs = require('fs')
var [[N], numList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./1253input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

if (N < 3) {
  console.log(0)
  process.exit(0)
}

numList.sort((a, b) => a - b)

const search = (st, ed, tar, sliceIdx) => {
  var newNumList = [...numList]
  if (sliceIdx) {
    newNumList = [...numList.slice(0, sliceIdx), ...numList.slice(sliceIdx + 1)]
  }
  while (st < ed) {
    var sumV = newNumList[st] + newNumList[ed]
    if (sumV === tar) {
      return 1
    } else if (sumV < tar) {
      st++
    } else {
      ed--
    }
  }

  return 0
}

var pre = Infinity
var preResult = 0
var GOODcnt = 0
for (let idx = 0; idx < N; idx++) {
  const cur = numList[idx]
  
  // 이전 숫자랑 같다면 이전 결과를 합산
  if (pre === cur) {
    GOODcnt += preResult
    continue
  }
  var result = 0
  if (idx === 0) {
    result = search(1, N-1, cur, 0)
  } else if (idx === N - 1) {
    result = search(0, N-2, cur, 0)
  } else {
    result = search(0, N-2, cur, idx)
  }
  GOODcnt += result
  pre = cur
  preResult = result
}
console.log(GOODcnt)