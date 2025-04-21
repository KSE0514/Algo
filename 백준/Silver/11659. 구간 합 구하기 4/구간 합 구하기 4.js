const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./11659input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

const [N, M] = input[0]
const numArr = input[1]
const tcArr = input.slice(2)

var sumArr = Array.from({length: N}, () => numArr[0])
for (let idx = 1; idx<N; idx++) {
  sumArr[idx] = sumArr[idx-1] + numArr[idx]
}
sumArr = [0, ...sumArr]
tcArr.forEach(el => {
  const [i, j] = el
  console.log(sumArr[j] - sumArr[i-1])
})