const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./1264input.txt").toString().trim().split('\n').map(el => el.trim().split(''))
input.pop()

const alpha = ['A', 'E', 'I', 'O', 'U', 'a', 'e', 'i', 'o', 'u']
input.forEach(strList => {
  let cnt = 0
  strList.forEach(str => {
    if (alpha.includes(str)) cnt++
  })
  console.log(cnt)
})