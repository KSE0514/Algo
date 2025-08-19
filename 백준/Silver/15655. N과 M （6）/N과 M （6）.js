const fs = require('fs')
var [[N, M], numbers] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./15655input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
numbers.sort((a, b) => a - b)

const result = []
const ST = []
const com = (d, stIdx) => {
  if (d === M) {
    result.push(ST.join(' '))
  }
  
  for (let i = stIdx; i < N; i++) {
    ST.push(numbers[i])
    com(d+1, i + 1)
    ST.pop()
  }
}

com(0, 0)
console.log(result.join('\n'))