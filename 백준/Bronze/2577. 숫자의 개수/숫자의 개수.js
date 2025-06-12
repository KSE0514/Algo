const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./2577input.txt").toString().trim().split('\n').map(Number)
var result = 1
const numCount = Array.from({length: 10}, () => 0)
input.forEach(num => {
  result *= num
})
result = String(result).split('').map(Number)
result.forEach(n => {
  numCount[n] += 1
})
numCount.forEach(cnt=>{
  console.log(cnt)
})