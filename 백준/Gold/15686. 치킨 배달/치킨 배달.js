const fs = require('fs')
var [[N, M], ...cityArr] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./15686input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

class Q {
  constructor(Array) {
    this.queue = [...Array]
    this.head = 0
  }

  enqueue(value) {
    this.queue.push(value)
  }

  dequeue() {
    return this.queue[this.head++]
  }

  isEmpty() {
    return this.queue.length === this.head
  }
}

var d = [1, 0, -1, 0]

const bfs = (starts) => {
  var dq = new Q(starts)
  var visited = Array.from({length: N}, () => Array.from({length: N}, () => 0))
  starts.forEach(p => visited[p[0]][p[1]] = 1)
  var chickenLen = 0
  while (!dq.isEmpty()) {
    var [curR, curC] = dq.dequeue()
    for (let i = 0; i < 4; i++) {
      var [newR, newC] = [curR + d[i], curC + d[(i+1)%4]]
      if (newR < 0 || newR >= N || newC < 0 || newC >= N) continue
      if (!visited[newR][newC]) {
        visited[newR][newC] = visited[curR][curC] + 1
        dq.enqueue([newR, newC])
        if (cityArr[newR][newC] === 1) {
          chickenLen += visited[newR][newC] - 1
          // 더하는 도중 도시의 치킨거리 최솟값을 넘어서면 bfs 중단
          if (chickenLen >= minLen) return Infinity
        }
      }
    }
  }
  return chickenLen
}

// 남겨놓을 M개의 치킨집을 조합 후 각 경우에 대해 도시의 치킨거리 계산
const com = (d, stIdx) => {
  if (d === M) {
    var chicken = bfs(selectChikens)
    minLen = Math.min(minLen, chicken)
    return
  }
  for (let i = stIdx; i < chickens.length; i++) {
    selectChikens.push(chickens[i])
    com(d+1, i+1)
    selectChikens.pop()
  }
}

var chickens = []
for (let r = 0; r < N; r++) {
  for (let c = 0; c < N; c++) {  
    if (cityArr[r][c] === 2) chickens.push([r, c]) // 치킨집 위치
  }
}
var selectChikens = [] // M개의 치킨 조합을 담을 배열
var minLen = Infinity // 도시의 치킨 거리 최솟값
com(0, 0)
console.log(minLen)