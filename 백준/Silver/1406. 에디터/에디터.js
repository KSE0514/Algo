const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? '/dev/stdin' : './1406input.txt').toString().trim().split('\n')

let str = input[0]
const M = Number(input[1])
const orders = input.slice(2).map(el => el.trim().split(' '))

let left = str.trim().split('')
let right = []

for (let i = 0; i < M; i++) {
  const [cmd, val] = orders[i]

  if (cmd === 'L') {
    if (left.length) right.push(left.pop())
  } else if (cmd === 'D') {
    if (right.length) left.push(right.pop())
  } else if (cmd === 'B') {
    if (left.length) left.pop()
  } else if (cmd === 'P') {
    left.push(val)
  }
}

console.log(left.join('') + right.reverse().join(''))




// //////////// 1차 시도_ 메모리 초과
// const fs = require('fs')
// var [str, [M], ...orders] = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./1406input.txt").toString().trim().split('\n')
// orders = orders.map(el => el.trim().split(' '))
// str = str.trim()
// // console.log(str, M, orders)

// class Editer {
//   constructor() {
//     this.string = []
//     this.cursor = 0
//   }

//   L() {
//     this.cursor = this.cursor === 0 ? 0 : this.cursor - 1
//   }

//   D() {
//     this.cursor = this.cursor === this.string.length ? this.cursor : this.cursor + 1
//   }

//   B() {
//     if (this.cursor > 0) {
//       if (this.cursor === this.string.length) {
//         this.string.pop()
//       } else {
//         this.string = [...this.string.slice(0, this.cursor-1), ...this.string.slice(this.cursor)]
//       }
//       this.cursor--
//     }
//   }

//   P(value) {
//     this.string = [...this.string.slice(0, this.cursor), value, ...this.string.slice(this.cursor)]
//     this.cursor++
//   }
// }

// const ed = new Editer()
// ed.string = str.split('')
// ed.cursor = str.length

// orders.forEach((order, idx) => {
//   const ord = order[0]
//   if (ord === 'P') {
//     ed.P(order[1])
//   }
//   else if (ord === 'L') {
//     ed.L()
//   }
//   else if (ord === 'B') {
//     ed.B()
//   } else if (ord === 'D') {
//     ed.D()
//   }
// })

// console.log(ed.string.join(''))