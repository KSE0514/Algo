const fs = require('fs')
var input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./7568input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
const [N] = input[0]
input = input.slice(1)
const rank = Array.from({length: N}, () => {})

input.forEach((value, idx) => {
  var cnt = 1
  for (let i = 0; i < N; i++) {
    if (i !== idx) {
      if (value[0] < input[i][0] && value[1] < input[i][1]) {
        cnt ++
      }
    }
    rank[idx] = cnt
  }
})
console.log(...rank)