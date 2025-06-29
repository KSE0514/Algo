const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./17143input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
const [R, C, M] = input[0] // 행, 열, 상어 수
var sharks = Array.from({length: C}, () => [])

// 상어 채우기
for (let i = 1; i <= M; i++) {
  const [r, c, s, d, z] = input[i] // 상어위치(행), 상어위치(열), 상어 속력, 이동 방향, 상어 크기
  // 속력s, 이동 방향d(1: 위, 2: 아래, 3: 오른, 4: 왼), 상어 크기z 
  sharks[c-1].push([r-1, c-1, s, d, z])
}

// 각 열에 대하여 행의 값이 작은 상어일수록 배열 앞에 오도록 정렬
sharks.forEach(sharksCol => {
  sharksCol = sharksCol.sort((a, b) => a[0] - b[0])
})

// 상어 이동 함수
const sharksMove = () => {
  const newSharks = Array.from({length: C}, () => []) // 상어의 이동 결과를 담을 새 (임시)배열
  const existShark = Array.from({length: R}, () => Array.from({length: C}, () => false)) // 상어가 특정 좌표에 존재하는지 나타내는 2차원 배열
  for (let col = 0; col < C; col ++) {
    while (sharks[col].length > 0) {
      const [curR, curC, speed, curD, size] = sharks[col].pop()
      // 위치 설정
      var newR = curR
      var newC = curC
      var newD = curD
      if (speed !== 0) {
        // 방향 및 좌표 재설정_위아래 이동일 경우
        if (curD === 1 || curD === 2) {
          if (curD === 1) {
            newR = Math.abs((Math.abs(((((R - 1) - curR + (R - 1)) + speed) % ((R-1) * 2)) - (R-1))) * (-1) + (R-1))
            // 방향 반대가 될 조건
            if (((R - 1) - curR + speed) % (2*(R-1)) === 0 || Math.trunc((((R - 1) - curR + speed) % (2*(R-1))) / R) === 1) {
              newD = 2
            }
          } else {
            newR = Math.abs((Math.abs(((newR + speed) % ((R-1) * 2)) - (R-1))) * (-1) + (R-1))
            // 방향 반대가 될 조건
            if (Math.trunc(((curR + speed) % (2*(R-1))) / R) === 1) {
              newD = 1
            }
          }
        } else {
          // 방향 및 좌표 재설정_좌우 이동일 경우
          if (curD === 3) {
            newC = Math.abs((Math.abs(((newC + speed) % ((C-1) * 2)) - (C-1))) * (-1) + (C-1))
            // 방향 반대가 될 조건
            if (Math.trunc(((curC + speed) % (2*(C-1))) / C) === 1) {
              newD = 4
            }
          } else {
            newC = Math.abs((Math.abs(((((C - 1) - curC + (C - 1)) + speed) % ((C-1) * 2)) - (C-1))) * (-1) + (C-1))
            // 방향 반대가 될 조건
            if (((C - 1) - curC + speed) % (2*(C-1)) === 0 || Math.trunc((((C - 1) - curC + speed) % (2*(C-1))) / C) === 1) {
              newD = 3
            }
          }
        }
      }
      if (!existShark[newR][newC]) {
        // 상어가 없는 좌표이면
        newSharks[newC].push([newR, newC, speed, newD, size])
        existShark[newR][newC] = true
      } else {
        // 이미 상어가 있다면
        var findShark = [] // 좌표가 같은 상어 정보 담을 곳
        newSharks[newC] = newSharks[newC].filter(shark => {
          if (shark[0] === newR && shark[1] === newC) {
            findShark = shark;
            return false; // 이 상어는 제거
          }
          return true; // 나머지는 유지
        });

        // 사이즈 비교해서 더 큰 거 남기기
        findShark = findShark[4] > size ? findShark : [newR, newC, speed, newD, size]
        // newSharks[newC]에 있는 상어 정보 업데이트
        newSharks[newC] = [findShark, ...newSharks[newC]]
      }
    }
  }

  newSharks.forEach(newShark => {
     newShark = newShark.sort((a, b) => a[0] - b[0])
  })
  sharks = [...newSharks]
}

var sumSize = 0 // 잡은 상어 사이즈 누적합
for (let sec = 0; sec < C; sec++) {
  // 1. 현재 열(sec)에서 상어가 있다면 행의 값이 가장 작은 상어 잡기
  if (sharks[sec].length > 0) {
    sumSize += sharks[sec][0][4]
    sharks[sec].shift()
  }

  // 2. 상어 이동(sec === C-1일 경우엔 이동 안 해도 될 것 같음)
  if (sec !== C-1) {
    sharksMove()
  }
}
console.log(sumSize)