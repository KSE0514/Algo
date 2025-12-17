const fs = require('fs')
var input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./15723input.txt").toString().trim().split('\n').map(el => el.trim().split(' '))

let st, ed, result, ST
const dfs = (cur, Gdic) => {
  if (cur === ed) {
    result = 1
    return
  }

  if (!(cur in Gdic)) return

  for (const nxt of Gdic[cur]) {
    if (!ST.includes(nxt)) {
      ST.push(nxt)
      dfs(nxt, Gdic)
      ST.pop()
    }
    if (result) {
      break
    }
  }

  return result
}

const n = Number(input[0])
const testN = Number(input[n+1])
const testList = input.slice(n+2)

const Gdic = {}

for (let i = 1; i <= n; i++) {
  const n1 = input[i][0]
  const n2 = input[i][2]

  if (n1 in Gdic) {
    Gdic[n1].push(n2)
  } else {
    Gdic[n1] = [n2]
  }
}

testList.forEach(test => {
  st = test[0]
  ed = test[2]

  result = 0
  ST = []
  if (st in Gdic) {
    dfs(st, Gdic)
  }
  if (result) {
    console.log('T')
  } else {
    console.log('F')
  }
})