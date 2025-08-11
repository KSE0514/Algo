const fs = require('fs')
var [[N], ...equations] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./22940input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

for (let row = 0; row < N; row++) {
  // 1. 기본행연산_상수배
  var c = equations[row][row] // 현재 행에서 처음으로 0이 아닌 요소
  if (c !== 1) {
    for (let i = row; i <= N; i++) {
      equations[row][i] /= c
    }
  }

  // 2. 기본행연산_행교체
  for (let ni = 0; ni < N; ni++) {
    if (row !== ni) {
      var c2 = (-1)* equations[ni][row] // 현재 주축의 위아래를 0으로 만들어줄 스칼라
      for (let j = row; j <= N; j++) {
        equations[ni][j] += equations[row][j] * c2
      }
    }
  }

  // 3. 기본행연산_행교환
  equations.sort((a, b) => {
    for (let i = 0; i < N; i++) {
      if (a[i] !== b[i]) {
        return b[i] - a[i]; // 내림차순: 큰 값이 앞으로
      }
    }
    return 0; // 모든 요소가 같으면 순서 유지
  });
}

// 해 출력
const result = []
for (let i = 0; i < N; i++) {
  result.push(Math.round(equations[i][N]))
}
console.log(...result)