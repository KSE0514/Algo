const fs = require('fs')
var [N, M] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./15651input.txt").toString().trim().split(' ').map(Number)

const result = []
const output = []
const com = (d) => {
  if (d === M) {
    output.push(result.join(' '))
    return
  }

  for (let idx = 1; idx <= N; idx++) {
    result.push(idx)
    com(d+1)
    result.pop()
  }
}

com(0)
console.log(output.join('\n'))