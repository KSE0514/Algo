const fs = require('fs')
const input = fs.readFileSync(process.platform === "linux" ? '/dev/stdin' : './10431input.txt').toString().trim().split("\n").map((el) => el.split(" ").map(Number))

const T = input.shift(); // 첫 번째 요소 ([4]) 제거
for (let i = 0; i < Number(T); i++) {
  const tc = input[i].shift() // 테스트 케이스 번호 제거후 tc로 반환
  let sortStudents = input[i].slice(0, 1) // (배열 쪼개기)첫 번째 학생만 담긴 배열
  const checkStudents = input[i].slice(1) // (배열 쪼개기) 두 번째 학생부터 끝까지 담긴 배열

  let sumV = 0
  checkStudents.forEach(student => 
  {
    let insertIdx = -1
    for (let i = 0; i < sortStudents.length; i++) {
      if (student < sortStudents[i]) {
        sumV += sortStudents.length - i // 학생들이 이동할 걸음 수 누적하고
        insertIdx = i
        break
      }
    }
      
    if (insertIdx !== -1) {
      sortStudents.splice(insertIdx, 0, student) // i인덱스 자리에 student 집어넣기
    } else {
      const newSortStudent = [...sortStudents, student]
      sortStudents = [...newSortStudent]
    }
  }
  )
  console.log(tc, sumV)
}