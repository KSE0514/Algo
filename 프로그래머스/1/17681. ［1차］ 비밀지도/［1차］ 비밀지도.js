function solution(n, arr1, arr2) {
    size = arr1.length
    const numTobi = (arr) => {
        let test = arr.map(v => v.toString(2).padStart(size, '0'))
        return test
    }
    
    let map1 = numTobi(arr1)
    let map2 = numTobi(arr2)
    let result = []
    for (let i = 0; i < size; i++){
        let st = ''
        // console.log(map1)
        for (let j =0; j < size; j++ ){
            if (map1[i][j] === '1' || map2[i][j] === '1'){
                st += '#'
            } else {
                st += ' '
            }
        }
        result.push(st)
    }
    // console.log(result)
    return result;
}