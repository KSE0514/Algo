const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./4949input.txt").toString().trim().split('\n').map(el => el.trim())
input.pop()

input.forEach(sentence => {
  const ST = []
  var flag = false
  for (let idx = 0; idx < sentence.length; idx++) {
    const s = sentence[idx]
    if (s === "(" || s === "[" ) {
      ST.push(s)
    } else if (s === ")"|| s === "]") {
      if (s === ")") {
        if (ST[ST.length-1] === "(") {
          ST.pop()
        } else {
          flag = true
          break
        }
      } else if (s === "]") {
        if (ST[ST.length-1] === '[') {
          ST.pop()
        } else {
          flag = true
          break
        }
      }
    }
  }


  if (ST.length > 0 || flag) {
    console.log('no')
  } else {
    console.log('yes')
  }
})