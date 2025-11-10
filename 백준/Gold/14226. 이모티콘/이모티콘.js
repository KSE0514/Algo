const fs = require('fs')
var [S] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./14226input.txt").toString().trim().split(' ').map(Number)

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
const MAXSIZE = 2001
const visited = Array.from({length: MAXSIZE}, () => Array(MAXSIZE).fill(false))

const bfs = () => {
  const dq = new Q()
  dq.enqueue([1, 0, 0]) // 스티커 개수, 클립보드에 복사된 스티커 개수, 시간
  visited[1][0] = true
  while (!dq.isEmpty()) {
    const [curNum, curClip, time] = dq.dequeue()
    if (curNum === S) {
      return time
    }
    
    // 클립보드 저장
    if (!visited[curNum][curNum]) {
      visited[curNum][curNum] = true
      dq.enqueue([curNum, curNum, time + 1])
    }

    // 클립보드 붙여넣기
    if (curClip > 0 && curNum + curClip < MAXSIZE && !visited[curNum+curClip][curClip]) {
      visited[curNum + curClip][curClip] = true
      dq.enqueue([curNum + curClip, curClip, time + 1])
    }

    // 화면에 있는 이모티콘 하나 삭제
    if (curNum > 0 && !visited[curNum - 1][curClip]) {
      visited[curNum - 1][curClip] = true
      dq.enqueue([curNum - 1, curClip, time + 1])
    }
  }
}

console.log(bfs())