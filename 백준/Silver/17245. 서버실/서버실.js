const fs = require('fs')
const [[N], ...arr] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./17245input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

const biSearch = (st, ed) => {
  var minTime = comList[comListLen-1]
  while (st <= ed) {
    var mid = Math.trunc((st+ed)/2)
    var comSum = 0 // 동작 가능한 컴퓨터 수

    // mid분이 지났을 때 동작 가능한 컴퓨터 수 세기
    for (let i = 0; i < comListLen; i++) {
      if (comList[i] <= mid) {
        comSum += comCnt[i] * comList[i]
      } else {
        comSum += comCnt[i] * mid
      }
    }

    // 절반 이상 동작할 수 있다면 => 시간 더 줄여보기
    if (comSum >= halfComputerN) {
      minTime = mid
      ed = mid - 1
    } else {
      st = mid + 1
    }
  }
  
  return minTime
}

const comDic = {}
var halfComputerN = 0 // 총 컴퓨터 수의 절반
for (let r = 0; r < N; r++) {
  for (let c = 0; c < N; c++) {
    const com = arr[r][c]
    halfComputerN += com
    if (com in comDic) {
      comDic[com] += 1
    } else {
      comDic[com] = 1
    }
  }
}
halfComputerN /= 2

const comList = Object.keys(comDic).map(Number).sort((a, b) => a - b) // 컴퓨터 종류
const comListLen = comList.length
const comCnt = Array(comListLen).fill(0) // 컴퓨터 종류별 개수

comList.forEach((com, idx) => {
  comCnt[idx] = comDic[com]
})

// 출력
console.log(biSearch(0, comList[comListLen-1]))