const fs = require('fs')
var [N] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./1644input.txt").toString().trim().split(' ').map(Number)

if (N == 1) {
  console.log(0)
  process.exit(0)
}

isPrime = Array(N+1).fill(true)
isPrime[0] = false
isPrime[1] = false
// 에라토스테네스
for (let i = 2; i <= N; i++) {
  if (isPrime[i]) {
    for (let j = i * 2; j <= N; j += i) {
      isPrime[j] = false
    }
  }
}
var st = 2, ed = 2, midSum = 2, cnt = 0
while (ed <= N && st <= ed) {
  // 연속 소수합이 N보다 크면 시작 소수 증가
  if (midSum > N) {
    midSum -= st
    // 시작 소수 증가
    st ++
    while (st <= N && !isPrime[st]) {
      st++
    }
  } 
  // 연속 소수합이 N보다 작으면 끝 소수 증가. 
  // 연속 소수합이 N과 같으면 경우의 수 카운트 후 끝 소수 증가
  else if (midSum <= N) {
    if (midSum === N) {
      cnt ++
    }
    if (ed === N) break // st === N === ed인 경우 or 연속 소수합이 N보다 작으면서 끝 소수를 더 이상 증가시킬 수 없는 경우에도 종료
    
    //끝 소수 증가
    ed++
    while (ed <= N && !isPrime[ed]) {
      ed++
    }
    midSum += ed
  }
}

console.log(cnt)