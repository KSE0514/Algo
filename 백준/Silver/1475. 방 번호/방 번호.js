const fs = require('fs')
var input = fs.readFileSync(process.platform === "linux" ? "/dev/stdin" : "./1475input.txt").toString().trim().split('').map(Number)
var arr = Array.from({length: 10}, () => 0)

input.forEach(num => {
  if (num === 6) {
    arr[9] += 1
  } else {
    arr[num] += 1
  }
})
arr[9] = Math.ceil(arr[9] / 2)
console.log(Math.max(...arr))