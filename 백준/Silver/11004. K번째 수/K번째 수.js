const fs = require('fs')
var input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./11004input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
const [N, K] = input[0]
input[1].sort((a, b) => a-b)
console.log(input[1][K-1])