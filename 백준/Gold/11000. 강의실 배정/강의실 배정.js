const fs = require('fs')
var [N, ...classList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./11000input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
classList.sort((a, b) => a[0] - b[0] || a[1] - b[1])

const sortPush = (v) => {
  var st = 0, ed = arr.length - 1
  var tmp = arr.length // arr의 맨 뒤를 기본값으로
  while (st <= ed) {
    var mid = Math.trunc((st + ed) / 2)
  if (arr[mid] >= v) {
      tmp = mid
      ed = mid - 1
    } else {
      st = mid + 1
    }
  }

  arr.splice(tmp, 0, v) // 인덱스 tmp에 v 추가
}

const biSearch = (start, end, tarSt, tarEd) => {
  var [st, ed] = [start, end]
  var tmpIdx = -1
  while (st <= ed) {
    var mid = Math.trunc((st+ed)/2)
    if (arr[mid] <= tarSt) {
      tmpIdx = mid
      st = mid + 1
    } else {
      ed = mid - 1
    }
  }
  if (tmpIdx !== -1) {
    arr.splice(tmpIdx, 1) // 사용할 강의실 제거
  }
  sortPush(tarEd) // 추가할 새 강의의 종료 시간을 arr에 삽입(arr이 오름차순이 되도록)
}

const arr = [classList[0][1]] // 강의가 끝난 시각 기록
if (N === 1) {
  console.log(1)
} else {
  for (let idx = 1; idx < N; idx++) {
    // 현재 수업의 시작시간보다 일찍 끝난 수업이 arr에 있는지 체크
      // 있다면 => 현재 수업의 끝나는 시간으로 업데이트 해준 후 arr 오름차순 정렬
      // 없다면 => arr에 현재 수업의 끝나는 시간을 추가해준 후 arr 오름차순 정렬
    biSearch(0, arr.length - 1, classList[idx][0], classList[idx][1])
  }
}

console.log(arr.length)