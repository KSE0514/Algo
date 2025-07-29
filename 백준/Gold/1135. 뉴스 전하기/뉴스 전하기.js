const fs = require('fs')
var [[N], [...bossList]] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./1135input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

treeInfo = {}
for (let i = 0; i < N; i++) {
  treeInfo[i] = []
}
bossList.forEach((boss, Idx) => {
  if (boss !== -1) {
    treeInfo[boss].push(Idx)
  }
})

const maxTime = Array.from({length: N}, () => 0)
const postorder = (root) => {
  if (treeInfo[root].length === 0) return // 리프노드면 return
  // 자식 노드들부터 순회
  treeInfo[root].forEach(child => {
    postorder(child)
  })

  var childTimes = [] // 자식 노드들이 각각 소식을 모두 전하는데 걸리는 시간을 담을 배열
  treeInfo[root].forEach(child => {
    childTimes.push(maxTime[child])
  })
  childTimes.sort((a, b) => b - a)

  // 소식을 모두 전하는데 오래 걸리는 자식순으로 전화하기
  childTimes.forEach((chT, idx) => {
    childTimes[idx] += idx + 1 // 부모가 자식에게 순차적으로 전화하기 때문에 더하는 값(idx + 1)이 1씩 늘어남
  })
  maxTime[root] = Math.max(...childTimes)
}

postorder(0)
console.log(maxTime[0])