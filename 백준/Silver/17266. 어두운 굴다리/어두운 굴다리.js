const fs = require('fs')
var [[N], [M], lightPositions] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./17266input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
var st = Math.max(lightPositions[0], N - lightPositions[M-1]) // 양 끝 가로등으로부터 도로 끝까지의 거리 중 최대값을 최소 높이로
var ed = N // 굴다리 길이를 최대 높이로

// 가로등과 가로등 사이 거리 중 최댓값 찾기
var maxLen = 0
for (let idx = 0; idx < M-1; idx++) {
  maxLen = Math.max(maxLen, lightPositions[idx+1] - lightPositions[idx])
}

const biSearch = (st, ed) => {
  var minH = ed
  while (st <= ed) {
    var mid = Math.trunc((st + ed) / 2)
    if (mid*2 >= maxLen) {
      minH = mid // 중간 저장
      ed = mid - 1 // 높이 더 줄여보기
    } else {
      st = mid + 1
    }
  }
  return minH
}

console.log(biSearch(st, ed))