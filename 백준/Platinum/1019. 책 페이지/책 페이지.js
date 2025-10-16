const fs = require('fs')
var [N] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./1019input.txt").toString().trim().split(' ').map(Number)
const numCnt = Array(10).fill(0)

let n = N
let d = 1 // 현재 자리값 (1의 자리 → 10의 자리 → ...)
while (n > 0) {
  const q = Math.floor(N / (d * 10)) // 현재 자리의 상위 자릿수
  const cur = Math.floor((N / d) % 10) // 현재 자리의 숫자
  const r = N % d // 현재 자리보다 아래의 나머지 숫자

  // 현재 자리(cur)에 따라 각 숫자 등장 횟수 계산
  for (let i = 0; i < 10; i++) {
    numCnt[i] += q * d // 상위 자릿수가 바뀌면서 각 숫자는 d번씩 등장
  }

  // 현재 자리(cur)가 등장하는 부분
  for (let i = 0; i < cur; i++) {
    numCnt[i] += d
  }

  numCnt[cur] += r + 1 // 현재 자리가 cur인 경우 (r만큼 + 자기 자신)

  d *= 10
  n = Math.floor(n / 10)
}

// 0은 맨 앞자리에 올 수 없으므로 조정
let d2 = 1
while (d2 <= N) {
  numCnt[0] -= d2
  d2 *= 10
}

console.log(numCnt.join(' '))