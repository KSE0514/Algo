const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./5639input.txt").toString().trim().split('\n').map(Number)

const treeDic = {}
const result = []

// 후위순회
const postoder = (root) => {
  if (treeDic[root][0] !== 0) {
    postoder(treeDic[root][0])
  }
  if (treeDic[root][1] !== 0) {
    postoder(treeDic[root][1])
  }
  result.push(root)
}

// 트리 틀 만들기
input.forEach(el => {
  if (!(el in treeDic)) {
  treeDic[el] = [0, 0] // 자식1, 자식2
  }
})

// 트리 채우기
if (input.length >= 2) {
  for (let idx = 1; idx < input.length; idx++) {
    root = input[0]
    while (true) {
      if (input[idx] < root) {
        // 만약 왼쪽 자식 노드가 비어있다면
        if (treeDic[root][0] === 0) {
          treeDic[root][0] = input[idx]
          break
        } else {
          // 비어있지 않다면
          root = treeDic[root][0]
        }
      }
      else if (input[idx] > root) {
        if (treeDic[root][1] === 0) {
          treeDic[root][1] = input[idx]
          break
        } else {
          root = treeDic[root][1]
        }
      }
    }
  }
}

postoder(input[0])
result.forEach(el => {
  console.log(el)
})