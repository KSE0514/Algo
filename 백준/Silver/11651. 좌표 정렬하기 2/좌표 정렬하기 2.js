const fs = require('fs')
var input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./11651input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
input = input.slice(1)

input.sort((a, b) => a[1] - b[1] || a[0] - b[0])
input.forEach(el => {
  console.log(...el)
})