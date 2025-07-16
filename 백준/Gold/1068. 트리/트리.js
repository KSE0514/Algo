const fs = require('fs')
var input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./1068input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
const [N] = input[0]
const [delN] = input[2] // 제거할 노드
const childInfo = Array.from({length: N}, () => []) // 자식 노드 담는 배열
const leafSum = Array.from({length: N}, () => 0) // 각 노드(index) 하위에 있는 리프노드 개수를 담는 배열
const leafs = []
var rootNode = -1 // 루트 노드

// 각 노드 하위에 있는 리프노드 개수를 세는 함수
const Tree = (root) => {
  if (childInfo[root].length === 0) {
    leafSum[root] = 1
    leafs.push(root)
    return
  }
  // 후위순회
  childInfo[root].forEach((child) => {
    Tree(child)
  })

  // 하위 리프 노드 개수 카운트
  var childCnt = 0
  childInfo[root].forEach((child) => {
    childCnt += leafSum[child]
  })
  leafSum[root] = childCnt
}

// 루트 노드 찾기 & 자식 정보 채우기
input[1].forEach((parentNode, idx) => {
  if (parentNode === -1) {
    rootNode = idx
  } else {
    childInfo[parentNode].push(idx)
  }
})
Tree(rootNode)
// 삭제하려는 노드가 루트 노드가 아닐 경우 삭제하려는 노드의 부모노드가 가진 자식의 수가 delN 하나 뿐이라면 결과에 +1 해줘야 함
if (delN !== rootNode && childInfo[input[1][delN]].length !== 1 || delN === rootNode) {
  console.log(leafSum[rootNode] - leafSum[delN])
} else {
  console.log(leafSum[rootNode] - leafSum[delN] + 1)
}