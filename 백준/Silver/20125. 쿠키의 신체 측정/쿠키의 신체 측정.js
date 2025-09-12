const fs = require('fs')
var [N, ...arr] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./20125input.txt").toString().trim().split('\n').map(el => el.trim())
N = Number(N)

const heartP = [-1, -1]
for (let r = 0; r < N; r++) {
  for (let c = 0; c < N; c++) {
    if (arr[r][c] === '*') {
      heartP[0] = r + 1
      heartP[1] = c
      break
    }
  }
  if (heartP[0] !== -1) {
    break
  }
}

var leftArm = 0
var rightArm = 0
var body = 0
var leftLeg = 0
var rightLeg = 0
// 왼팔
for (let c = heartP[1] - 1; c >= 0; c--) {
  if (arr[heartP[0]][c] === "*") {
    leftArm += 1
  } else {
    break
  }
}
// 오른팔
for (let c = heartP[1] + 1; c < N; c++) {
  if (arr[heartP[0]][c] === "*") {
    rightArm += 1
  } else {
    break
  }
}
// 몸통
for (let r = heartP[0] + 1; r < N; r++) {
  if (arr[r][heartP[1]] === '*') {
    body += 1
  } else {
    break
  }
}
// 왼 다리
for (let r = heartP[0] + body + 1; r < N; r++) {
  if (arr[r][heartP[1]-1] === '*') {
    leftLeg += 1
  }
  if (arr[r][heartP[1]+1] === '*') {
    rightLeg += 1
  }
  if (arr[r][heartP[1]-1] !== '*' && arr[r][heartP[1]+1] !== '*' ) {
    break
  }
}

console.log(heartP[0] + 1, heartP[1] + 1)
console.log(leftArm, rightArm, body, leftLeg, rightLeg)