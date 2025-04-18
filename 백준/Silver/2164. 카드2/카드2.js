const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? '/dev/stdin' : './2164input.txt').toString().trim()

N = Number(input)
let i = 1
card = Array.from({length: N}, () => i++)
let head = 0 // 요소를 버리거나 맨 뒤로 옮길 때마다 + 1
let cnt = 0 // 요소를 버릴 때마다 + 1

while (cnt !== N - 1) {
  if (head % 2 === 0) {
    cnt ++
  } else {
    card.push(card[head])
  }
  head ++
}

console.log(card[head])