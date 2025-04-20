const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : './1003input.txt').toString().trim().split('\n').map(el => el.split(' ').map(Number))

const dp0 = Array.from({length: 41}, () => 0)
const dp1 = Array.from({length: 41}, () => 0)
dp0[0] = 1
dp1[1] = 1

for (let i = 2; i <= 40; i++) {
  dp1[i] = dp1[i-1] + dp1[i-2]
  dp0[i] = dp0[i-1] + dp0[i-2]
}

input.slice(1).forEach(arr => {
  const n = Number(arr)
  console.log(dp0[n], dp1[n])
})