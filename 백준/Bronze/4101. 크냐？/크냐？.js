const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./4101input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
input.pop()
input.forEach(i => {
  const [A, B] = i
  if (A > B) {
    console.log("Yes")
  } else {
    console.log("No")
  }
})