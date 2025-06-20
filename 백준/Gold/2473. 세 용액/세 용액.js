const fs = require('fs')
var input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./2473input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
const [N] = input[0] // 용액 수
input = input[1].sort((a, b) => a-b) // 용액 리스트

var charaValue = Infinity // 특성값
var solutions = [] // 특성값을 만드는 용액들을 담을 배열

const biSearch = (fir, sec, st, ed) => {
  var [start, end] = [st, ed]
  while (start <= end) {
    var mid = Math.trunc((start + end) / 2)
    var testSolution = input[fir] + input[sec] + input[mid]
    if (Math.abs(testSolution) < charaValue) {
      charaValue = Math.abs(testSolution)
      solutions = [input[fir], input[sec], input[mid]]
      if (charaValue === 0) {
        return
      }
    }

    if (testSolution < 0) {
      start = mid + 1
    } else {
      end = mid - 1
    }
  }
}

// 첫 번째로 고를 용액
for (let first = 0; first < N-2; first ++) {
  // 두 번째로 고를 용액
  for (let second = first + 1; second < N-1; second ++) {
    // 세 번째로 고를 용액은 이분 탐색으로 찾기
    biSearch(first, second, second+1, N-1)
  }
}

console.log(...solutions)