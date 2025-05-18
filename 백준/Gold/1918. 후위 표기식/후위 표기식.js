const fs = require('fs')
const input = fs.readFileSync(process.platform === 'linux' ? "/dev/stdin" : "./1918input.txt").toString().trim()

class Stack {
  constructor() {
    this.stack = []
    this.head = -1
  }

  push(value) {
    this.head++
    this.stack.push(value)
  }

  pop() {
    return this.stack.pop([this.head--])
  }

  isEmpty() {
    return this.head === -1
  }
}
const isp = {'+': 1, '-': 1, "*": 2, "/": 2, "(": 0}
const icp = {'+': 1, '-': 1, "*": 2, "/": 2, "(": 3}
const ST = new Stack()
var result = ''
const alpha = /[a-zA-Z]/ // alpha.test(s) => s에 알파벳이 포함되어 있을 때 true, 아닐 때 false
for (s of input) {
  // 피연산자일 경우 문자열에 바로 추가
  if (alpha.test(s)) {
    result += s
  } 
  // 피연산자가 아닐 경우
  else {
    if (s === ")") {
      while(!ST.isEmpty()) {
        var cal = ST.pop()
        if (cal === "(") {
          break
        }
        result += cal
      }
    }

    else if (ST.isEmpty()) {
      ST.push(s)
    } else {
      while (!ST.isEmpty() && icp[s] <= isp[ST.stack[ST.head]]) {
        var cal2 = ST.pop()
        result += cal2
      }
      ST.push(s)
    }
  }
}

while (!ST.isEmpty()) {
  var cal3 = ST.pop()
  result += cal3
}

console.log(result)