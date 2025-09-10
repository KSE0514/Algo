const fs = require('fs')
var [[N, M], ...words] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./20920input.txt").toString().trim().split('\n').map(el => el.trim().split(' '))
const dic = {}
words = words.map(word => word[0]).filter(word => {
  if (word.length >= M) {
    if (word in dic) {
      dic[word][0] += 1 // 단어 등장 횟수 증가
    } else {
      dic[word] = [1, word.length, word] // 단어가 등장한 횟수, 단어 길이, 단어
    }
    return word
  }
})

const wordsInfo = Object.values(dic) // dic의 value 요소들만 모은 배열
const result = wordsInfo.sort((a, b) => b[0] - a[0] || b[1] - a[1] || a[2].localeCompare(b[2])).map(wordInfo => wordInfo[2])
console.log(result.join('\n'))