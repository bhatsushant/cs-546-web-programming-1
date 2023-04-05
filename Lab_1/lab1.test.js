const lab1 = require("./lab1");

console.log("---------- Test Cases for 'questionOne'----------");

console.log(lab1.questionOne([5, 3, 10]));
//returns and outputs: {'18': false, '2': true, '93': false}

console.log(lab1.questionOne([2]));
// returns and outputs: {'3': true} 

console.log(lab1.questionOne([]));
// returns and outputs: {}

console.log(lab1.questionOne());
// returns and outputs: {}

console.log(lab1.questionOne({}));
// returns and outputs: {}

console.log("---------- Test Cases for 'questionTwo'----------");
console.log(lab1.questionTwo([1, 1, 1, 1, 1, 1]));
// //returns and outputs: [1]

console.log(lab1.questionTwo([1, '1', 1, '1', 2]));
// // returns and outputs: [1, '1', 2] 

console.log(lab1.questionTwo([3, 'a', 'b', 3, '1']));
// // returns and outputs: [3, 'a', 'b', '1']

console.log(lab1.questionTwo([]));
//returns and outputs: []

console.log(lab1.questionTwo([1, 2, 3, 2, 1]));
// // should return and output: [1, 2, 3] 


console.log("---------- Test Cases for 'questionThree'----------");
console.log(lab1.questionThree(["cat", "act", "foo", "bar"]));
// returns and outputs: { act: ["cat", "act"] }

console.log(lab1.questionThree(["race", "care", "foo", "foo", "foo"]));
// returns and outputs: { acer: ["race", "care"] } 

console.log(lab1.questionThree(["foo", "bar", "test", "Sushant", "Bhat"]));
// returns and outputs: {}

console.log(lab1.questionThree([]));
// returns and outputs: {}

console.log(lab1.questionThree({}));
// returns and outputs: {}

console.log(lab1.questionThree(["bar", "car", "car", "arc"]));
// returns and outputs: { acr: ["car", "arc"] }

console.log(lab1.questionThree(['evil', 'a gentleman', 'elegant man', 'eleven plus two', 'twelve plus one', 'cat', 'act', 'cat', 'foo', 'bar', 'vile']));

console.log("---------- Test Cases for 'questionFour'----------");
console.log(lab1.questionFour(1, 3, 2));
// should return and output: 4

console.log(lab1.questionFour(2, 5, 6));
//returns and outputs: 194

console.log(lab1.questionFour(0, 4, 8));
//returns and outputs: 10086

console.log(lab1.questionFour(0, 0, 8));
//returns and outputs: 15120

console.log(lab1.questionFour(1, 1, 1));
//returns and outputs: 3

console.log(lab1.questionFour(1, 0));

console.log(lab1.questionFour());