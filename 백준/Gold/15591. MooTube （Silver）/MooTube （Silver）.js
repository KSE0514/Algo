const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux'? '/dev/stdin' : "./15591input.txt").toString().trim().split("\n").map((el)=>el.split(" ").map(Number))

const [N, Q] = input.shift()
const G = Array.from({ length: N+1 }, () => [])

for (let i = 0; i<N-1; i++) {
  const [p, q, r] = input.shift()
  G[p].push([q, r])
  G[q].push([p, r])
}


input.map( el => {
  const [k, v] = el
  const que = [[v, 10**9]]
  const visited = Array.from({length: N+1}, () => 10**9)
  let cnt = 0
  
  while (que.length > 0) {
    const [cur, r] = que.shift()
    G[cur].map(el => {
      const [nxt, usado] = el
      if (nxt !== v && visited[nxt] === 10**9) {
        visited[nxt] = Math.min(r, usado)
        que.push([nxt, visited[nxt]])
        if (visited[nxt] >= k) {
          cnt += 1
        }
      }
    })
  }
  console.log(cnt)
})