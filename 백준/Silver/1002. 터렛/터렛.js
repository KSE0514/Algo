const fs = require('fs')
let [[T], ...tcList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./1002input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

let idx = 0
while (T-- > 0) {
  const [x1, y1, r1, x2, y2, r2] = tcList[idx++]

  // 원의 중심이 같고
  if (x1 === x2 && y1 === y2) {
    // 반지름의 길이가 같으면 => 일치(무수히 많은 점)
    if (r1 === r2) {
      console.log(-1)
    } else {
    // 반지름 길이가 다르면 => 안 만남(교점 0개)
    console.log(0)
    }
  } else {
    // d = 서로다른 점 (x1, y1), (x2, y2) 사이의 거리(두 원 중심의 거리)
    const d = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)

    // d > r1 + r2 => 안 만남
    if (d > r1 + r2) {
      console.log(0)
    }
    // d == r1 + r2 => 외접(한 점에서 만남)
    else if (d === r1 + r2) {
      console.log(1)
    }
    else {
      const r1ToR2 = Math.abs(r1 - r2)
      // |r1 - r2| < d < r1 + r2 => 두 점에서 만남
      if (r1ToR2 < d) {
        console.log(2)
      }
      // |r1 - r2| == d => 내접(한 점에서 만남)
      else if (r1ToR2 === d) {
        console.log(1)
      }
      // |r1 - r2| > d => 한 원이 다른 원의 내부
      else {
        console.log(0)
      }
    }
  }
}