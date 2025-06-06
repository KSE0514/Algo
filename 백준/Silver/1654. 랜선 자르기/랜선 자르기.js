const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./1654input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
var [K, N] = input[0]
K = Number(K)
N = Number(N)

const LANs = []
for (let idx = 1; idx <= K; idx ++) {
  LANs.push(Number(input[idx]))
}

var start = 1
var end = (Math.max(...LANs)) * 2
var maxV = 0
var cnt = 0

while (start <= end) {
  cnt = 0
  var mid = Math.trunc((start + end) / 2)
  LANs.forEach(lan => {
    cnt += Math.trunc(lan / mid)
  })
  if (cnt >= N) {
    maxV = Math.max(maxV, mid)
    start = mid + 1
  } else {
    end = mid -1
  }
}

console.log(maxV)