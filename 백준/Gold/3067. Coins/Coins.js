const fs = require('fs')
var [[T], ...tcList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./3067input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

let idx = 0
for (let tc = 0; tc < T; tc++) {
  const [N] = tcList[idx++]
  const coinList = tcList[idx++]
  const [M] = tcList[idx++]
  const caseCnt = Array(M+1).fill(0)
  coinList.forEach(coin => {
    caseCnt[coin] += 1
    for (let c = 1; c <= M - coin; c++) {
      caseCnt[coin + c] += caseCnt[c] // 금액 c를 만들 수 있는 경우에 동전 coin을 추가해서 coin + c의 금액을 만드는 가짓수
    }
  })
  console.log(caseCnt[M])
}