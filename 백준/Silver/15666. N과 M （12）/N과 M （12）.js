const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./15666input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

const [N, M] = input[0]
var numArr = []
if (N === 1) {
  numArr = input[1]
} else {
  const numSet = new Set(input[1])
  numArr = Array(...numSet)
}
numArr.sort((a, b) => a-b)

const com = (d, s, nxtIdx) => {
  if (d === M) {
    if (result.indexOf(s) === -1) {
      result.push(s)
    }
    return
  }

  for (let idx = nxtIdx; idx<numArr.length; idx++) {
    com(d+1, s+','+numArr[idx], idx)
  }
}

const result = []
com(0, '/', 0)

result.forEach(el => {
  console.log(el.split(',').slice(1).join(' '))
})