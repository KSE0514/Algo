const fs = require('fs')
var [[N, S], numbers] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "1806input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

var st = 0, ed = 0 // 각각 연속된 수의 시작/끝 인덱스
var midSum = numbers[0] // 중간합
var minLen = Infinity // 최소 길이
while (st < N && ed < N) {
  if (midSum >= S) {
    minLen = Math.min(minLen, ed - st + 1)
    // 합이 S 이상이면 시작 부분을 오른쪽으로 한 칸 이동
    midSum -= numbers[st]
    st++
  } else {
    // 합이 S 미만이라면 종료 부분을 오른쪽으로 한 칸 이동
    if (ed < N - 1) {
      ed++
      midSum += numbers[ed]
    } else {
      break
    }
  }
}


// 출력
if (minLen === Infinity) {
  console.log(0)
} else {
  console.log(minLen)
}