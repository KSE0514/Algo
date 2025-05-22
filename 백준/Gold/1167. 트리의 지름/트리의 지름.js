const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./1167input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

const N = Number(input[0])
const G = Array.from({length: N+1}, () => [])
const maxSide = Array.from({length: N+1}, () => 0)
var maxMidSum = 0

for (let i = 1; i <= N; i++) {
  const par = input[i][0]
  for (let idx = 1; idx < input[i].length; idx += 2) {
    const child = input[i][idx]
    if (child !== -1) {
      const value = input[i][idx+1]
      G[par].push([child, value])
    }
  }
}

const postorder = (par, root) => {
  for (childNd of G[root]) {
    if (childNd[0] !== par) {
      postorder(root, childNd[0])
    }
  }

  // 자식들 탐색하며 maxSide[root]에 
  // 'maxSide[자식 번호] + 자식까지의 거리값(edgeV)'와 maxSide[root]중 큰 값을 저장
  const childEdgeValues = []
  for (childNd of G[root]) {
    const [childNB, edgeV] = childNd
    if (childNB !== par) {
      maxSide[root] = Math.max(maxSide[root], maxSide[childNB] + edgeV)
      childEdgeValues.push(edgeV + maxSide[childNB])
    }
  }

  // maxMidSum에는 root이하의 노드로부터 root를 걸쳐 또 다른 root이하 노드까지 가는데 최댓값을 저장함
  if (childEdgeValues.length >= 2) {
    childEdgeValues.sort((a, b) => b - a)
    maxMidSum = Math.max(maxMidSum, childEdgeValues[0] + childEdgeValues[1])
  } else {
    maxMidSum = Math.max(maxMidSum, ...childEdgeValues)
  }
}

postorder(0, 1)

console.log(maxMidSum)