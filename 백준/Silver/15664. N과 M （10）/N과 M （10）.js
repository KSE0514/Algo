const fs = require('fs')
var [[N, M], numList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./15664input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
numList.sort((a, b) => a - b)

const result = []
const ST = []

const com = (d, stIdx) => {
  if (d === M) {
    let joinST = ST.join(' ')
    if (!result.includes(joinST)) {
      result.push(ST.join(' '))
    }
  }

  for (let idx = stIdx; idx < N; idx++) {
    ST.push(numList[idx])
    com(d+1, idx+1)
    ST.pop()
  }
}

com(0, 0)
console.log(result.join('\n'))