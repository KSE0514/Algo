const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./1106input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

const [C, N] = input[0] // 최소 인원, 도시 개수
const cities = input.slice(1)

cities.sort((a, b) => a[1] - b[1] || a[0] - b[0]) // 인원 오름차순, 비용 오름차순
const dp = Array.from({length: C+100}, () => Infinity) // 배열 길이: 인덱스가 0부터 시작함 + 적어도 C이상인 것 중 최솟값을 구하고자 하는 것이므로

// cities안의 정보로 딱 한 번 광고를 했을 때 사용되는 비용 미리 채워두기
cities.forEach(el => {
  const [co, peopleNum] = el
  dp[peopleNum] = Math.min(dp[peopleNum], co)
})

for (let i = 0; i < N; i++) {
  const [cost, num] = cities[i]
  for (let n = num + 1; n < dp.length; n++) {
    dp[n] = Math.min(dp[n], dp[n - num] + cost)
  }
}

console.log(Math.min(...dp.slice(C)))