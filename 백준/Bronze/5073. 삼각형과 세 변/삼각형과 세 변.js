const fs = require('fs')
var input = fs.readFileSync(process.platform === 'linux' ? '/dev/stdin' : "./5073input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
input.pop()
input.forEach(numList => {
  numList.sort((a, b) => b - a)
  if (numList[0] >= numList[1] + numList[2]) {
    console.log("Invalid")
  } else {
    numSet = new Set(numList)
    const deduplication = numSet.size
    if (deduplication === 3) {
      console.log("Scalene")
    } else if (deduplication === 2) {
      console.log("Isosceles")
    } else {
      console.log("Equilateral")
    }
  }
})