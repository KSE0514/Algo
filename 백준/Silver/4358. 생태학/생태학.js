const fs = require('fs')

const input = fs.readFileSync(
  process.platform === 'linux' ? '/dev/stdin' : './4358input.txt'
).toString()

const treeDic = Object.create(null)

input.split('\n').forEach(line => {
  const tree = line.trim()
  if (!tree) return
  treeDic[tree] = (treeDic[tree] || 0) + 1
})

const total = Object.values(treeDic).reduce((a, b) => a + b, 0)

const result = Object.entries(treeDic)
  .sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0))
  .map(([name, cnt]) => `${name} ${(cnt * 100 / total).toFixed(4)}`)

console.log(result.join('\n'))
