const fs = require('fs')
var input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./2467input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

const [N] = input[0]
input = input[1]

const biSearch = (start, end) => {
  // 혼합할 나머지 한 용액을 고르는 과정 (※ 이미 선택한 용액의 인덱스는 start-1)
  const solution1 = input[start-1]
  var [st, ed] = [start, end]
  while (st <= ed) {
    var mid = Math.trunc((st + ed) / 2)
    var solution2 = input[mid]

    // 특성값 업데이트 및 특성값이 0이 되는 경우가 있는지 확인
    if (Math.abs(solution1 + solution2) < Math.abs(charaValue)) {
      charaValue = solution1 + solution2
      solutions = [solution1, solution2]
      if (charaValue === 0) {
        return
      }
    }
    if (solution1 + solution2 < 0) {
      st = mid + 1
    } else {
      ed = mid - 1
    }
  }
}

var charaValue = Infinity // 절댓값이 가장 작은 특성값을 담을 변수
var solutions = [] // 특성값을 만드는 용액 두 종류를 담을 배열
for (let idx = 0; idx < N-1; idx++) {
  biSearch(idx+1, N-1)
  if (charaValue === 0) {
    break
  }
}
console.log(...solutions)