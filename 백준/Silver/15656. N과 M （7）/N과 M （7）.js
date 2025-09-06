const fs = require('fs')
var [[N, M], numList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./15656input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
numList.sort((a, b) => a - b)

const result = []
const com = (d) => {
  if (d === M) {
    result.push(ST.join(' '))
    return
  }

  for (let i = 0; i < N; i++) {
    ST.push(numList[i])
    com(d+1)
    ST.pop()
  }
}

const ST = []
com(0)
console.log(result.join('\n'))