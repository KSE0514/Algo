const fs = require('fs')
var [n, inorder, postorder] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./2263input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))
n = Number(n)

// 트리 구조를 담을 딕셔너리
const treeInfo = {}
for (let i = 1; i <= n; i++) {
  treeInfo[i] = [-1, -1]
}

const tree = (par, parIn, parPost, stIdx, edIdx) => {
  if (parIn < 0 || parIn > n - 1 || parPost < 0 || parPost > n - 1) return
  inorder[parIn] = 0 // 방문 표시
  // 오른쪽 서브 트리가 있는지, 있다면 후위 표기식에서 어떤 노드를 시작으로 오른쪽 서브 트리 노드들인지
  var rSubStarN = parIn < edIdx ? inorder[parIn + 1] : 0
  var rSubStartIdxPost = rSubStarN > 0 ? postorder.indexOf(rSubStarN) : -1
  // par노드의 왼쪽 서브 트리가 있는지 판단 기준: parIn > stIdx
  if (parIn > stIdx && parIn <= edIdx) {
    rSubStarN > 0 && rSubStartIdxPost > 0 ? tree(postorder[rSubStartIdxPost - 1], inorder.indexOf(postorder[rSubStartIdxPost - 1]), rSubStartIdxPost-1, stIdx, parIn-1) : tree(postorder[parPost-1], inorder.indexOf(postorder[parPost-1]), parPost-1, stIdx, parIn -1)
  }
  // par노드의 오른쪽 서브 트리가 있는지 판단 기준: parIn < edIdx && rSubStarN > 0
  if (parIn < edIdx && rSubStarN > 0) {
    tree(postorder[parPost-1], inorder.indexOf(postorder[parPost - 1]), parPost-1, parIn + 1, edIdx)
  }

  // 자식 채우기
  if (parIn > stIdx) {
    treeInfo[par][0] = rSubStarN > 0 ? postorder[rSubStartIdxPost-1] : postorder[parPost-1]
  }
  if (parIn < edIdx && rSubStarN > 0) {
    treeInfo[par][1] = postorder[parPost-1]
  }
}

// 전위순회
const preorder = (root) => {
  preoderResult.push(root)
  if (treeInfo[root][0] !== -1) {
    preorder(treeInfo[root][0])
  }
  if (treeInfo[root][1] !== -1) {
    preorder(treeInfo[root][1])
  }
}

var root = postorder[n-1]
var rootIdxPost = n-1
var rootIdxIn = inorder.indexOf(root)
tree(root, rootIdxIn, rootIdxPost, 0, n-1)
// preorder & 결과 출력
const preoderResult = []
preorder(root)
console.log(...preoderResult)