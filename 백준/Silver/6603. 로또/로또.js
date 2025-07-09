const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./6603input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
input.pop() // 맨 끝 0 제거

for (let tc = 0; tc < input.length; tc ++) {
  const K = input[tc][0]
  const numList = input[tc].slice(1)
  const LottoNum = []

  const com = (d, startIdx) => {
    if (d === 6) {
      console.log(...LottoNum)
    }

    for (let i = startIdx; i < K; i++) {
      LottoNum.push(numList[i])
      com(d+1, i+1)
      LottoNum.pop()
    }
  }

  com(0, 0)
  console.log()
}