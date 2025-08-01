const fs = require('fs')
var [[S, C], ...greenOniList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./14627input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

greenOniList.forEach((greenOni, idx) => {
  greenOniList[idx] = greenOni[0]
})
greenOniList.sort((a, b) => b - a)

var st = 1
var ed = greenOniList[0]
var result = 0 // 파닭을 만들고 남은 파의 길이
while (st <= ed) {
  var mid = Math.trunc((st + ed) / 2) // 파닭 한 개를 만들 때 사용되는 파의 길이
  var cnt = 0 // 파를 mid 길이로 치킨 위에 올렸을 경우 만들 수 있는 파닭의 개수
  var sumV = 0 // 파 길이 총 합
  greenOniList.forEach(greenO => {
    cnt += Math.trunc(greenO/mid)
    sumV += greenO
  })
  // 만들려는 파닭의 개수를 충족하면
  if (cnt >= C) {
    result = sumV - mid * C
    st = mid + 1 // 파 길이 조금 더 길게 해보기
  } else {
    // 만들려는 파닭의 개수에 못 미치면
    ed = mid - 1
  }
}

console.log(result)