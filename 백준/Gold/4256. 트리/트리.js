const fs = require('fs')
var [[T], ...tcList] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./4256input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

for (let tc = 0; tc < T; tc++) {
  const [n] = tcList[tc*3]
  const preResult = tcList[tc*3 + 1] // 전위순회 결과
  const inResult = tcList[tc*3 + 2] // 중위순회 결과

  // 중위순회 인덱스 매핑
  const inIdx = {}
  for (let i = 0; i < n; i++) {
    inIdx[inResult[i]] = i
  }

  const postResult = []

  const build = (preStart, inStart, inEnd) => {
    const root = preResult[preStart] // 현재 노드
    const rootIdx = inIdx[root] // 중위 순회에서의 현재 노드의 인덱스
    const leftSize = rootIdx - inStart

    // 왼쪽 서브 트리가 있다면
    if (leftSize > 0) {
      build(preStart + 1, inStart, rootIdx - 1)
    }

    // 오른쪽 서브 트리가 있다면
    if (rootIdx < inEnd) {
      build(preStart + leftSize + 1, rootIdx + 1, inEnd)
    }

    postResult.push(root)
  }

  build(0, 0, n-1)
  console.log(...postResult)
}