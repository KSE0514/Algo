const fs = require('fs')
var [N, numList1, M, numList2] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./30805input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
N = Number(N)
M = Number(M)

const LCS = []
for (let r = 0; r < N; r++) {
  for (let c = 0; c < M; c++) {
    if (numList1[r] === numList2[c]) {
      LCS.push([numList1[r], r, c])
    } 
  }
}

if (LCS.length === 0) {
  console.log(0)
} else {
  // 큰 값 우선
  LCS.sort((a, b) => b[0] - a[0] || a[1] - b[1])
  // console.log("LCS 정리", LCS)
  const result = [LCS[0]]
  var head = 0
  for (let idx = 0; idx < LCS.length; idx++) {
    if (idx != 0) {
      if (result[head][1] < LCS[idx][1] && result[head][2] < LCS[idx][2]) {
        result.push(LCS[idx])
        head ++
      }
    }
  }
  // 실제 값들만 다시 result에 남기기(인덱스 제거)
  for (let idx = 0; idx < result.length; idx++) {
    result[idx] = result[idx][0]
  }
  console.log(result.length)
  console.log(...result)
}