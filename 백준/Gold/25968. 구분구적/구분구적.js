const fs = require('fs')
var [[n], coefficient, [k]] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "25968input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

// console.log(n, coefficient, k)
const q = (t) => {
  var y = 0
  for (coef of coefficient) {
    y = y * t + coef
  }
  return y
}

// 사잇값 정리_해찾기
const bisection = (f, a, b, tol=1e-7) => {
  var Fa = f(a), Fb = f(b)
  if (Fa * Fb > 0) {
    return null
  }
  while (b - a > tol) {
    var mid = (a + b) / 2
    var Fmid = f(mid)
    if (Fa * Fmid <= 0) {
      b = mid
      Fb = Fmid
    } else {
      a = mid
      Fa = Fmid
    }
  }

  return (a + b) / 2
}

// 해 구하기
const roots = []
for (let a = 0; a <= 1024; a++) {
  let b = a + 1
  if (q(a) === 0) {
    let x = Math.sqrt(a)
    roots.push(-x)
    roots.push(x)
    break
  }
  else if (q(b) === 0) {
    let x = Math.sqrt(b)
    roots.push(-x)
    roots.push(x)
    break
  }
  else if (q(a) * q(b) < 0) {
    let x = Math.sqrt(bisection(q, a, b))
    roots.push(-x)
    roots.push(x)
    break
  }
}

// 구분구적법
const dx = (roots[1] - roots[0]) / k
var sumV = 0
for (let i = 0; i < k; i++) {
  var c = roots[0] + dx * i
  var d = c + dx
  var e = (c + d) / 2
  var h = q(e*e)
  sumV += h * dx
}

// 출력
const result = Math.abs(sumV.toFixed(4)) // 소숫점 아래 5번째에서 반올림
if (Number.isInteger(result)) { // 정수이면 '정수.0' 형태로 출력되도록
  console.log(result.toFixed(1))
} else {
  console.log(result)
}