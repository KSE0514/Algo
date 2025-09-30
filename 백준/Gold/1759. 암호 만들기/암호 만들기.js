const fs = require('fs')
var [[L, C], alphabetList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./1795input.txt").toString().trim().split('\n').map(el => el.trim().split(' '))
L = Number(L)
C = Number(C)
const vowel = ['a', 'e', 'i', 'o', 'u']
const conList = [] // alphabetList에서의 자음들
const vowList = [] // alphabetList에서의 모음들

// 자음, 모음 분류하기
alphabetList.forEach(alpha => {
  if (vowel.includes(alpha)) {
    vowList.push(alpha)
  } else {
    conList.push(alpha)
  }
})

const result = [] // 최종 암호를 담을 배열
var ST = []

// 모음 고르기
const selectVow = (d, stIdx, maxLen) => {
  if (d === maxLen) {
    selectCon(0)
  }

  for (let idx = stIdx; idx < vowList.length; idx++) {
    ST.push(vowList[idx])
    selectVow(d + 1, idx + 1, maxLen)
    ST.pop()
  }
}

// 자음 고르기
const selectCon = (stIdx) => {
  if (ST.length === L) {
    result.push([...ST].sort((a, b) => a.localeCompare(b)).join(''))
    return
  }
  
  for (let idx = stIdx; idx < conList.length; idx++) {
    ST.push(conList[idx])
    selectCon(idx + 1)
    ST.pop()
  }
}

// 암호 만들기_모음 1개 자음 3개 ... 모음 L-2개 자음 2개
for (let i = 1; i <= L-2; i++) {
  ST = []
  selectVow(0, 0, i)
}

// 출력
console.log(result.sort((a, b) => a.localeCompare(b)).join('\n'))