const fs = require('fs')
var fx = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./17214input.txt").toString().trim().split(/(?=[+-])/)
const coefficient = Array.from({length: 2}, () => 0)

fx.forEach(term => {
  const termLen = term.length
  // 일차 항이라면
  if (term[termLen - 1] === 'x') {
    term = term.slice(0, termLen - 1)
    if (term.length > 0) {
      if (term === '-') {
        coefficient[0] -= 1
      } else {
        coefficient[0] += Number(term)
      }
    } else {
        coefficient[0] += 1
    }
  } else { // 상수 항이라면
    coefficient[1] += Number(term)
  }
})

coefficient[0] = Math.trunc(coefficient[0] / 2)

var newTerm = []
// 식 만들기
if (coefficient[0] !== 0) { // 이차항
  if (Math.abs(coefficient[0]) === 1) {
    if (coefficient[0] > 0) {
      newTerm.push("xx")
    } else {
      newTerm.push("-xx")
    }
  } else {
    newTerm.push(`${coefficient[0]}xx`)
  }
}
if (coefficient[1] !== 0) { // 일차항
  if (Math.abs(coefficient[1]) === 1) {
    if (coefficient[1] > 0) {
      newTerm.push(newTerm.length > 0 ? "+x": "x")
    } else {
      newTerm.push("-x")
    }
  } else {
    if (coefficient[1] > 0) {
      newTerm.push(newTerm.length > 0 ? `+${coefficient[1]}x` : `${coefficient[1]}x`)
    } else {
      newTerm.push(`${coefficient[1]}x`)
    }
  }
}
newTerm.push(newTerm.length > 0 ? "+W": 'W') // 상수항

// 출력
console.log(newTerm.join(""))