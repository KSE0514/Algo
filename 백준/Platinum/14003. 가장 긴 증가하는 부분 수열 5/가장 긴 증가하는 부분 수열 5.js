const fs = require('fs')
var [N, numArray] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./14003input.txt").toString().split('\n').map(el => el.split(' ').map(Number))
N = Number(N)
const list = [numArray[0]]
const lenHis = Array.from({length: N}, () => 1)
var head = 0

const biSearch = (tar, len) => {
  var [start, end] = [0, len-1]
  while (start <= end) {
    var mid = Math.trunc((start + end) / 2)
    if (list[mid] === tar) {
      return mid
    } 
    else if (mid >= 0 && list[mid-1] < tar && tar < list[mid]) {
      return mid
    }
    else if (tar > list[mid]) {
      start = mid + 1
    } else {
      end = mid - 1
    }
  }
  return start
}

for (let idx = 1; idx < N; idx ++) {
  const target = numArray[idx]
  if (target > list[head]) {
    list.push(target)
    head ++
    lenHis[idx] = head + 1
  } else {
    const findIdx = biSearch(target, list.length)
    list[findIdx] = target
    lenHis[idx] = findIdx + 1
  }
}

console.log(list.length)

var maxV = Math.max(...lenHis) 
var maxVIdx = lenHis.indexOf(maxV)
const result = []
while (maxVIdx >= 0) {
  if (lenHis[maxVIdx] === maxV) {
    result.push(numArray[maxVIdx])
    maxV --
  }
  maxVIdx --
}

console.log(...result.reverse())