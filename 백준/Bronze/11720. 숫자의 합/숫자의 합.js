const fs = require('fs')
var input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./11720input.txt").toString().trim().split('\n').map(el => el.trim())
const N = Number(input[0])
const numList = input[1].split('').map(Number)
var result = 0
numList.forEach(num => {
  result += num
})
console.log(result)