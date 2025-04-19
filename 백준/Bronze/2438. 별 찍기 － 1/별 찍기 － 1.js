const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : './2438input.txt').toString().trim()

for (let i = 1; i<=input; i++) {
  const star = Array.from({length: i}, () => '*').join('')
  console.log(star)
}