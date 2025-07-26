const fs = require('fs')
var [T, ...tcList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./1010input.txt")
  .toString()
  .trim()
  .split('\n')
  .map(el => el.split(' ').map(Number))

const C = (n, r) => {
  if (r > n - r) r = n - r
  let result = 1
  for (let i = 0; i < r; i++) {
    result *= (n - i)
    result /= (i + 1)
  }
  return Math.round(result)
}

for (let tc = 0; tc < T; tc++) {
  const [N, M] = tcList[tc]
  console.log(C(M, N))
}
