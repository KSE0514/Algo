const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./1967input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

const N = Number(input[0])
const tree = Array.from({length: 10001}, () => [])

for (let i = 1; i<N; i++) {
  const [par, child, value] = input[i]
  tree[par].push([child, value])
}
var maxSumV = 0 // 부모노드를 중간 거처로 할 때 최댓값을 저장
const maxSideArr = Array.from({length: 10001}, () => 0) // 키의 노드로부터 왼쪽or오른쪽 경로값 합 중 최대인 것을 저장 'n-최댓값'쌍 
const postorder = (root) => {
  const candiArr = []
  // root의 왼쪽 자식부터 순차적으로 탐색하며
  // maxSumV에는 root아래 노드에서 root를 거쳐 root 아래 또 다른 노드까지의 경로의 최대합을 저장
  // maxSideArr[노드번호]에는 '노드 번호'부터 '노드 번호'아래 노드까지의 경로 중 최댓값이 담겨있음
  for (childNd of tree[root]) {
    // childNd === [자식 번호, 간선 value]
    postorder(childNd[0])
  }

  // 'root - root 이하 노드'까지 가장 길이가 긴 경로
  for (childNd of tree[root]) {
    maxSideArr[root] = Math.max(maxSideArr[root], maxSideArr[childNd[0]] + childNd[1])
    candiArr.push(maxSideArr[childNd[0]]+childNd[1])
  }

  var rootMidSumV = 0
  candiArr.sort((a, b) => b-a)
  for (let idx = 0; idx < Math.min(2, candiArr.length); idx++) {
    rootMidSumV += candiArr[idx]
  }
  maxSumV = Math.max(maxSumV, rootMidSumV)
}
postorder(1)
console.log(maxSumV)