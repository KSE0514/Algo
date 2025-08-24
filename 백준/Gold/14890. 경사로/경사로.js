const fs = require('fs')
var [[N, L], ...arr] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./14890input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

var rootCnt = 0 // 길 개수
// 1. (행) 길 판단
for (let r = 0; r < N; r++) {
  let startH = arr[r][0] // 현재 높이(기준 높이)
  let startHCol = 0 // 현재 높이가 처음 시작된 열
  let flag = 1
  let c = 1
  while (c < N) {
    // 현재 높이와 같다면 continue
    if (arr[r][c] === startH) {
      c++
      continue
    }

    // 현재 높이와 다르다면
    if (Math.abs(startH - arr[r][c]) === 1) {
      if (startH < arr[r][c]) { // 현재 높이보다 더 높은 상황
        if (c-startHCol >= L) { // 경사로를 설치할 수 있다면
          // 기준 높이 관련 정보 업데이트
          startH = arr[r][c] // 기준 높이
          startHCol = c // 기준 높이가 처음 시작된 열
        } else {
          flag = 0
          break
        }
      } else { // 현재 높이보다 더 낮은 상황
        const tmpH = arr[r][c] // 낮아진 높이 임시 저장
        const tmpHCol = c // 처음으로 높이가 낮아진 열
        c++
        // tmpH와 높이가 같은 개수 === c - tmpHCol + 1
        while (c < N &&  c < tmpHCol + L && arr[r][c] === tmpH) {
          c++
        }
        if (c === tmpHCol + L) {
          startH = tmpH
          startHCol = c
        } else {
          flag = 0
          break
        }
      }
    } else { // 높이 차가 1이 아닐경우 중단
      flag = 0
      break
    }
  }
  if (flag) rootCnt++ // 끝까지 도달하는데 문제가 없었다면 길 개수 증가
}

// 2. (열) 길 판단
for (let c = 0; c < N; c++) {
  let startH = arr[0][c] // 현재 높이
  let startHRow = 0 // 현재 높이가 처음 시작된 행
  let flag = 1
  let r = 1
  while (r < N) {
    // 현재 높이와 같다면 continue
    if (arr[r][c] === startH) {
      r++
      continue
    }

    // 현재 높이와 다르다면
    if (Math.abs(startH - arr[r][c]) === 1) {
      if (startH < arr[r][c]) { // 현재 높이보다 더 높은 상황
        if (r-startHRow >= L) { // 경사로를 설치할 수 있다면
          // 기준 높이 관련 정보 업데이트
          startH = arr[r][c] // 기준 높이
          startHRow = r // 기준 높이가 처음 시작된 행
        } else {
          flag = 0
          break
        }
      } else { // 현재 높이보다 더 낮은 상황
        const tmpH = arr[r][c] // 낮아진 높이 임시 저장
        const tmpHRow = r // 처음으로 높이가 낮아진 행
        r++
        // tmpH와 높이가 같은 개수 === r - tmpHRow + 1
        while (r < N &&  r < tmpHRow + L && arr[r][c] === tmpH) {
          r++
        }
        if (r === tmpHRow + L) {
          startH = tmpH
          startHRow = r
        } else {
          flag = 0
          break
        }
      }
    } else { // 높이 차가 1이 아닐경우 중단
      flag = 0
      break
    }
  }
  if (flag) rootCnt++ // 끝까지 도달하는데 문제가 없었다면 길 개수 증가
}

console.log(rootCnt)