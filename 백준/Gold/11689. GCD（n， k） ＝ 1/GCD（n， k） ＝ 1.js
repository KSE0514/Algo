const fs = require('fs')
var n = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./11689input.txt").toString().trim().split(' ').map(Number)

if (n === 1) {
  console.log(1)
} else {
  var result = n
  var limit = Math.floor(Math.sqrt(n))
  // 소인수 구하기_에라토스테네스 체
  const numArr = Array.from({length: limit + 1}, () => true)
  const primes = []
  for (let i = 2; i * i <= limit; i++) {
    if (numArr[i]) {
      for (let j = i * i; j <= limit; j += i) numArr[j] = false
    }
  }
  for (let i = 2; i <= limit; i++) {
    if (numArr[i] && n % i === 0) {
      primes.push(i)
      while (n % i === 0) {
        n /= i
      }
    }
  }

  if (n > 1) {
    primes.push(n)
  }
  // 오일러 파이함수(서로소 개수 공식)
  primes.forEach(prime => {
    result *= (1 - 1/prime)
  })
  console.log(Math.round(result))
}