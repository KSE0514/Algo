const fs = require('fs')
const input = fs.readFileSync(process.platform === "linux" ? '/dev/stdin' : "./1991input.txt").toString().trim().split('\n').map(el=>el.trim().split(' '))

const N = Number(input[0])
const GDic = {}
for (let i = 1; i <= N; i++) {
  const [pre, r, l] = input[i]
  GDic[pre] = [r, l] // 가령 pre === 'A'라면 GDic에 'A(key) : A의 자식 노드를 담은 배열(value)'을 저장
}

// 전위 순회
const preorder = (root) => {
  st += root
  if (GDic[root][0] !== '.') {
    preorder(GDic[root][0])
  }
  if (GDic[root][1] !== ".") {
    preorder(GDic[root][1])
  }
}

// 중위 순회
const inorder = (root) => {
  if (GDic[root][0] !== '.') {
    inorder(GDic[root][0])
  }
  st += root
  if (GDic[root][1] !== '.') {
    inorder(GDic[root][1])
  }
}

// 후위 순회
const postorder = (root) => {
  if (GDic[root][0] !== '.') {
    postorder(GDic[root][0])
  }
  if (GDic[root][1] !== '.') {
    postorder(GDic[root][1])
  }
  st += root
}

for (let i = 0; i < 3; i ++) {
  st = ''
  if (i === 0) {
    preorder('A')
    console.log(st)
  } else if (i === 1) {
    inorder('A')
    console.log(st)
  } else if (i === 2) {
    postorder('A')
    console.log(st)
  }
}