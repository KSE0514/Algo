const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? '/dev/stdin' : './1259input.txt').toString().trim().split('\n').map(el => el.trim())

input.forEach(el => {
  const mIdx = Math.trunc(el.length/2)
  if (el !== '0') {
    let s1 = ''
    let s2 = ''
    if (el.length % 2 === 1) {
      s1 = el.substring(0, mIdx)
      s2 = el.substring(mIdx + 1).split('').reverse().join('')
    } else {
      s1 = el.substring(0, mIdx)
      s2 = el.substring(mIdx).split('').reverse().join('')
    }
    console.log(s1 === s2? "yes" : 'no')
  }
})