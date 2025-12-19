const fs = require('fs')
var [[N, K, M], ...kimbapList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./18113input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

const newKimbapList = []
var maxLenKimbap = 0
for (let i = 0; i < N; i++) {
  let x = kimbapList[i][0]
  if (x <= K) continue
  if (x < 2*K) x -= K
  else x -= 2*K
  if (x > 0) {
    newKimbapList.push(x)
    if (x > maxLenKimbap) maxLenKimbap = x
  }
}

const biSearch = (st, ed) => {
  var maxP = -1
  while (st <= ed) {
    var mid = Math.floor((st + ed) / 2)
    var cnt = 0
    // mid 길이로 김밥 자르기
    for (let i = 0; i < newKimbapList.length; i++) {
      cnt += Math.floor(newKimbapList[i] / mid)
      if (cnt >= M) break
    }

    // 최소 개수가 만들어진다면 자르는 길이 늘려보기
    if (cnt >= M) {
      maxP = mid
      st = mid + 1
    } else {
      ed = mid - 1
    }
  }

  return maxP
}
console.log(biSearch(1, maxLenKimbap))