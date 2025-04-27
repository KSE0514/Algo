const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? '/dev/stdin' : "./11047input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

const [N, K] = input[0]
const coins = []
for (let i = 1; i<= N; i++) {
  const coin = Number(input[i])
  // K보다 큰 동전으론 K를 만들 수 없으므로 버리기
  if (coin <= K) {
    coins.push(coin)
  }
}
coins.sort((a, b) => b - a) // 내림차순 정렬

let cnt = 0
let sumV = 0
for (v of coins) {
  if (sumV === K) {
    break
  } else {
    while (sumV + v <= K) {
      sumV += v
      cnt ++
    }
  }
}
console.log(cnt)