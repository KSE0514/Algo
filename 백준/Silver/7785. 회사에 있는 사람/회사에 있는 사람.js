const fs = require('fs')
var [[N], ...logs] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./7785input.txt").toString().trim().split('\n').map(el => el.trim().split(' '))

const members = {}
logs.forEach(log => {
  members[log[0]] = log[1]
})

const remain = []
for (let mem in members) {
  if (members[mem] === 'enter') {
    remain.push(mem)
  }
}
// 사전 역순 정렬
remain.sort().reverse();

console.log(remain.join('\n'));