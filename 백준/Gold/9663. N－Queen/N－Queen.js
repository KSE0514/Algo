const fs = require('fs')
var [N] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./9663input.txt").toString().trim().split(' ').map(Number)

var cnt = 0
const com = (d, stIdx) => {
  if (d === N) {
    cnt ++
    return
  }

  for (let idx = stIdx; idx < N; idx++) {
    if (d > 0) {
      var flag = 0 // 공격을 한 번이라도 당하는지의 여부
      // idx가 이전에 놓인 퀸들에게 공격이 당하지 않는 위치인지 확인
      for (let colIdx = 0; colIdx < ST.length; colIdx++) {
        if (idx === ST[colIdx] || idx === ST[colIdx] + (d - colIdx) || idx === ST[colIdx] - (d - colIdx)) {
          flag = 1
          break
        }
      }
      if (flag) {
        continue
      } else {
        ST.push(idx)
        com(d+1, 0)
        ST.pop()
      }
    } else {
      ST.push(idx)
      idx === 0 ? com(d+1, idx + 2) : com(d+1, 0)
      ST.pop()
    }
  }
}

const ST = []
com(0, 0)
console.log(cnt)