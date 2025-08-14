const fs = require('fs')
var [[N, B], ...Matrices] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./10830input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

const multi = (M1, M2) => {
  const resultM = Array.from({length: N}, () => Array.from({length: N}, () => 0))
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      for (let i = 0; i < N; i++) {
        resultM[r][c] += (M1[r][i] * M2[i][c])
        resultM[r][c] %= 1000
      }
    }
  }
  return resultM
}

const biMulti = (b) => {
  if (b === 1) {
    return Matrices
  } else {
    var mid = Math.trunc(b/2)
    const half = biMulti(mid) // 중간 결과 저장
    if (b % 2 === 0) {
      return multi(half, half)
    } else {
      return multi(multi(half, half), Matrices)
    }
  }
}

// 출력
biMulti(B).forEach(row => {
  row = row.map(c => {
    return c % 1000
  })
  console.log(row.join(' '))
})