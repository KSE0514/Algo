const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./15654input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

const [N, M] = input[0]
input[1].sort((a, b) => a - b)
const ST = []
const visited = Array.from({length: N}, () => false)
const com = (d) => {
  if (d === M) {
    console.log(ST.join(' '))
    return
  } else {
    for (let idx = 0; idx < N; idx++) {
      if (!visited[idx]) {
        visited[idx] = true
        ST.push(input[1][idx])
        com(d+1)
        ST.pop()
        visited[idx] = false
      }
    }
  }
}

com(0)