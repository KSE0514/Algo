const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./20040input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

const [n, m] = input[0]
const parentInfo = Array.from({length: n}, (_, i) => i) // 부모 초기값은 자기자신

const find = (x) => {
  if (parentInfo[x] !== x) parentInfo[x] = find(parentInfo[x])
  return parentInfo[x]
}

const union = (a, b) => {
  const pa = find(a)
  const pb = find(b)
  if (pa === pb) return false
  parentInfo[pb] = pa
  return true
}

var result = 0 // 사이클이 형성되지 않을 경우 0
for (let i = 1; i<= m; i++) {
  const [n1, n2] = input[i]
  if (!union(n1, n2)) {
    result = i
    break
  }
}

console.log(result)