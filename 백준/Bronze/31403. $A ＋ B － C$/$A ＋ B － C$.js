const fs = require('fs');
const input = fs.readFileSync(process.platform === "linux" ? "/dev/stdin" : "./31403input.txt").toString().trim().split("\n").map(Number)
// input === [3, 4, 5]
let [a, b, c] = input
console.log(a+b-c)
console.log(Number(String(a)+String(b))-c)