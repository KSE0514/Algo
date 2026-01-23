const fs = require('fs')
var [[T], ...tcList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./9375input.txt").toString().trim().split('\n').map(el => el.trim().split(' '))
T = Number(T)

let idx = 0
while (T-- > 0) {
  const n = Number(tcList[idx++])
  const clothDic = {}
  for (let i = 0; i < n; i++) {
    const [cloth, categ] = tcList[idx++]
    if (categ in clothDic) {
      clothDic[categ].push(cloth)
    } else {
      clothDic[categ] = [cloth]
    }
  }
  
  const dicValues = Object.values(clothDic)
  const dicValuesCnt = dicValues.map(dicV => dicV.length)
  const result = dicValuesCnt.reduce((prev, cur) => prev * (cur + 1), 1)
  console.log(result-1) // 아무것도 안 입었을 경우 제외하고 출력
}