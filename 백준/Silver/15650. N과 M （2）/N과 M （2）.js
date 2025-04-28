const fs = require('fs')
const input = fs.readFileSync(process.platform === "linux" ? "/dev/stdin" : "./15650input.txt").toString().trim().split(' ').map(Number)

const [N, M] = input
const log = []
let i = 1
const numArray = Array.from({length: N}, () => i++)
const visited = Array.from({length: N}, () => false)
const com = (d, nxtIdx) => {
  if (d === M) {
    console.log(log.join(' '))
    return
  }

  for (let idx = nxtIdx; idx<N; idx++) {
    if (!visited[idx]) {
      visited[idx] = true
      log.push(numArray[idx])
      com(d + 1, idx + 1)
      log.pop()
      visited[idx] = false
    }
  }
}

com(0, 0)