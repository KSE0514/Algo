const fs = require('fs')
var [[N, M], ...recipes] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./20119input.txt")
  .toString().trim().split('\n').map(el => el.split(' ').map(Number))

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
    return this.head >= this.queue.length
  }
}

const liquid = recipes.pop() // 가지고 있는 물약
const liquid_num = recipes.pop()[0] // 가지고 있는 물약 개수

const recipeList = [] // 각 레시피: [결과물, [재료들]]
const dependOn = Array.from({ length: N + 1 }, () => []) // 재료 -> 레시피 인덱스 목록
const need = [] // 각 레시피별로 남은 필요 재료 수

// 레시피 파싱
for (let i = 0; i < M; i++) {
  const [cnt, ...arr] = recipes[i]
  const result = arr.pop() // 만들어질 물약
  const ingredients = arr  // 필요한 물약들
  recipeList.push([result, ingredients])
  need.push(ingredients.length)
  for (let ing of ingredients) dependOn[ing].push(i)
}

const canMake = Array(N + 1).fill(false)
const dq = new Q()

for (let liq of liquid) {
  canMake[liq] = true
  dq.enqueue(liq)
}

while (!dq.isEmpty()) {
  const cur = dq.dequeue()
  // 현재 물약을 사용하는 모든 레시피 확인
  for (const ridx of dependOn[cur]) {
    need[ridx] -= 1
    // 이 레시피의 모든 재료가 완성되면 결과물 생산 가능
    if (need[ridx] === 0) {
      const [result] = recipeList[ridx]
      if (!canMake[result]) {
        canMake[result] = true
        dq.enqueue(result)
      }
    }
  }
}

// 출력
const makeList = []
for (let i = 1; i <= N; i++) {
  if (canMake[i]) makeList.push(i)
}

console.log(makeList.length)
console.log(...makeList)
