const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./15652input.txt").toString().trim().split(' ').map(Number)

const [N, M] = input
let i = 1
const numArray = Array.from({length: N}, () => i++)
const ST = []
const com = (d, nxtIdx) => {
  if (d === M) {
    console.log(ST.join(' '))
  } else {
    for (let idx = nxtIdx; idx<N; idx++) {
        ST.push(numArray[idx])
        com(d + 1, idx)
        ST.pop()
      // }
    }
  }
}

com(0, 0)