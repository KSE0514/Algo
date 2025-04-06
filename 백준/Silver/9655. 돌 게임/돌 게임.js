const fs = require("fs")
const input = fs.readFileSync(process.platform === "linux"? '/dev/stdin' : './9655input.txt').toString().trim().split().map(Number);

if (input[0] % 2 === 1) {
  console.log("SK")
} else {
  console.log("CY")
}