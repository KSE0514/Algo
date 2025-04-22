const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : '11399input.txt').toString().trim().split('\n').map(el => el.split(' ').map(Number))

const N = Number(input[0])
const arr = input[1]
arr.sort((a, b) => a - b) // 오름차순 정렬

let sumV = arr[0]
for (let i = 1; i<N; i++){
  arr[i] += arr[i-1]
  sumV += arr[i]
}

console.log(sumV)