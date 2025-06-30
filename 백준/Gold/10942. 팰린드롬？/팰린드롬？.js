const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./10942input.txt").toString().trim().split('\n').map(el => el.split(' ').map(Number))

const [N] = input[0] // 수열의 크기
const numList = input[1] // 숫자들
const [M] = input[2] // 질문의 개수

const dp = Array.from({length: N}, () => Array.from({length: N}, () => 0))

// 길이가 1일 때
for (let i = 0; i < N; i++) {
  dp[i][i] = 1
}

// 길이가 2일 때
for (let i = 0; i < N - 1; i++) {
  if (numList[i] === numList[i+1]) {
    dp[i][i+1] = 1
  }
}

// 길이가 3일 때
for (let len = 3; len <= N; len ++) {
  for (let st = 0; st <= N - len; st ++) {
    const ed = st + len - 1
    if (numList[st] === numList[ed] && dp[st+1][ed-1] === 1) {
      dp[st][ed] = 1
    }
  }
}

const queries = input.slice(3);
// 출력을 모아서 한 번에 출력
let result = '';
for (const [S, E] of queries) {
  result += dp[S - 1][E - 1] + '\n';
}
console.log(result);