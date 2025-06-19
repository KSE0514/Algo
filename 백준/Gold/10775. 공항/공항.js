const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./10775input.txt").toString().trim().split('\n').map(Number)
// console.log(input)
const G = input[0] // 게이트 개수
const P = input[1] // 비행기 개수
var giList = input.slice(2) // 도킹 시도할 gi들(총 P개)
let i = 0
const gates = Array.from({length: G+1}, () => i++)

const find = (gates, num) => {
  // gates[num] === num인 경우에만 도킹 가능
  if (gates[num] === num) return num
  // 다르다면 다음 도킹 가능 위치(gates[num]와 도킹 시도하는 번호가 같은 곳) 찾기
  return gates[num] = find(gates, gates[num])
}

let cnt = 0
for (let idx = 0; idx < P; idx++) {
  var gateNum = giList[idx] // 맨 처음 도킹을 시도할 번호
  var findGate = find(gates, gateNum)
  // 도킹 가능한 게이트가 없으면 끝내기
  if (findGate === 0) break
  // 도킹 가능한 게이트가 있다면, 도킹 후 다음 비행기가 해당 번호로 도킹을 시도했을 때 도킹 가능 위치를 알려주도록 -1
  cnt ++
  gates[findGate] -= 1
}
console.log(cnt)