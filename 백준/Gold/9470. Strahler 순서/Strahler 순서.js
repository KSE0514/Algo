const fs = require('fs')
var [[T], ...tcList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./9470input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

class Q {
  constructor() {
    this.queue = []
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

let idx = 0
for (let tc = 0; tc < T; tc++) {
  const [K, M, P] = tcList[idx++]
  const end = idx
  const G = Array.from({length: M + 1}, () => [])
  const indegree = Array.from({length: M+1}, () => 0)
  const strahler = Array.from({length: M +1}, () => 0)
  const tmpStrahler = Array.from({length: M +1}, () => [0, 0]) // [임시 strahler 순서(*), 들어오는 강 중 strahler 순서가 (*)와 같은 강의 수]
  for (idx; idx < end + P; idx++) {
    const [A, B] = tcList[idx]
    G[A].push(B)
    indegree[B] += 1
  }
  
  const dq = new Q()
  // 강의 근원의 노드 순서 1로 채우기
  for (let i = 1; i <= M; i++) {
    if (indegree[i] === 0) {
      strahler[i] = 1
      dq.enqueue(i)
    }
  }

  while (!dq.isEmpty()) {
    const curN = dq.dequeue() // 현재 하천 노드 번호
    G[curN].forEach(nxtN => {
      indegree[nxtN] -= 1

      // strahler 번호 저장
      // 들어오는 강 중 가장 큰 것을 임시 strahler 값으로 저장하고 개수 또한 1로 초기화
      if (tmpStrahler[nxtN][0] < strahler[curN]) { 
        tmpStrahler[nxtN][0] = strahler[curN]
        tmpStrahler[nxtN][1] = 1
      } else if (tmpStrahler[nxtN][0] === strahler[curN]) {
        tmpStrahler[nxtN][1] += 1
      }

      // 전입차수가 0이 되면 strahler 순서 확정 및 dq에 추가
      if (indegree[nxtN] === 0) {
        // strahler 순서 확정
        if (tmpStrahler[nxtN][1] === 1) {
          strahler[nxtN] = tmpStrahler[nxtN][0]
        } else if (tmpStrahler[nxtN][1] > 1) {
          strahler[nxtN] = tmpStrahler[nxtN][0] + 1
        }

        // dq에 추가
        dq.enqueue(nxtN)
      }
    })
  }
  // 출력
  console.log(tc+1, Math.max(...strahler))
}
