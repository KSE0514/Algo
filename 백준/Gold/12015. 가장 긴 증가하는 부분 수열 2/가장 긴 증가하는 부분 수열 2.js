const fs = require('fs')
var [N, numArray] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./12015input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
N = Number(N)

const arr = [numArray[0]]
var head = 0
const biSearch = (tar, len) => {
  var [start, end] = [0, len - 1]
  while (start < end) {
    var midIdx = Math.trunc((start + end) / 2)
    if (tar === arr[midIdx]) {
      return midIdx
    }
    else if (midIdx - 1 >= 0 && arr[midIdx - 1] < tar && tar < arr[midIdx]) {
      // Arr에 tar과 같거나 tar보다 처음으로 큰 값이 있으면 그 값의 인덱스를 return
      return midIdx
    } else if (arr[midIdx] > tar) {
      end = midIdx - 1
    } else {
      start = midIdx + 1
    }
  }
  return start
}

for (let idx = 1; idx < N; idx++) {
  const target = numArray[idx]
  if (arr[head] < target) {
    arr.push(target)
    head ++
  } else {
    findIdx = biSearch(target, arr.length)
    arr[findIdx] = target
  }
}

console.log(arr.length)