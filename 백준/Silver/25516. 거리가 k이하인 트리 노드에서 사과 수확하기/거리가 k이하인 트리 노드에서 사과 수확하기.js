const fs = require('fs')
var [[n, k], ...linkList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./25516input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
const apple = linkList.pop()
const G = Array.from({length: n}, () => [])

var appleCnt = 0
const tree = (d, cur) => {
  if (d === k) {
    return
  }

  for (const nxt of G[cur]) {
    appleCnt += apple[nxt]
    tree(d+1, nxt)
  }
}

linkList.forEach(link => {
  const [p, c] = link
  G[p].push(c)
})

appleCnt += apple[0]
tree(0, 0)
console.log(appleCnt)
