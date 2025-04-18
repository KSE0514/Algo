const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : './11866input.txt').toString().trim().split(' ').map(Number)

const [N, K] = input
const order = []
let i = 1
const people = Array.from({length: N}, () => i++)
let idx = 0
let cnt = 0
while (order.length !== N) {
  if (people[idx % N] !== 0) {
    cnt += 1
    if (cnt === K) {
      order.push(people[idx % N])
      people[idx % N] = 0
      cnt = 0
    }
  }
  idx += 1
}

console.log(`<${order.join(', ')}>`)