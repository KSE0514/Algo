const fs = require('fs')
var input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./2655input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
const [N] = input[0]
input = input.slice(1).map((el, idx) => {
  return [idx+1, ...el]
})

input.sort((a, b) => b[1] - a[1]) // 밑면 넓이 내림차순

const dp = Array(N).fill(0) // 인덱스에 대응되는 박스가 맨 위에 있을 때의 최대 높이를 저장
const path = Array(N).fill(-1) // 인덱스에 대응되는 박스(＠)가 맨 위에 있을 때 최대 높이가 되게하는 경우에서 ＠ 바로 밑에 쌓인 박스의 인덱스를 저장

for (let i = 0; i < N; i++) {
  dp[i] = input[i][2] // 인덱스 i인 박스만 쌓였을 경우 최대 높이
  for (let j = 0; j < i; j ++) {
    // 박스를 밑 면적 기준으로 내림차순 정렬 한 상태이므로 무게 비교만 하면 됨
    if (input[j][3] > input[i][3]) {
      if (dp[i] < dp[j] + input[i][2]) {
        dp[i] = dp[j] + input[i][2]
        path[i] = j
      }
    }
  }
}

// 추적
var maxIdx = dp.indexOf(Math.max(...dp))
const result = []
while (maxIdx !== -1) {
  result.push(input[maxIdx][0])
  maxIdx = path[maxIdx]
}

// 출력
console.log(result.length)
result.forEach(boxNum => {
  console.log(boxNum)
})