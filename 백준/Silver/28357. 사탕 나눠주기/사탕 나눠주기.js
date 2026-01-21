const fs = require('fs')
const [[N, K], pointList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./28357input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

const biSearch = (st, ed) => {
  let minX = ed // 최소 기준점수 
  while (st <= ed) {
    let mid = Math.floor((st+ed) / 2) // 임시 기준점수
    let candyCnt = pointList.reduce((prev, cur) => {
      if (cur > mid) {
        return prev + (cur-mid)
      }
      return prev
    }, 0)
    // 충분히 사탕을 나눠줄 수 있다면 점수를 더 줄여보기
    if (candyCnt <= K) {
      minX = mid
      ed = mid - 1
    } else {
      st = mid + 1
    }
  }
  return minX
}

console.log(biSearch(0, Math.max(...pointList)))