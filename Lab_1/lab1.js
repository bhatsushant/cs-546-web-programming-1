const questionOne = function questionOne(array) {
    let obj = {};
    if (!Array.isArray(array) || array === undefined) {
        return obj;
    } else {
        array.forEach(element => {
            let result = Math.abs(Math.pow(element, 2) - 7);
            if (result === 1) {
                return "1 is neither a prime or a composite number!"
            } else if (result === 2) {
                obj[result] = true;
            } else {
                for (let i = 2; i < result; i++) {
                    if (result % i === 0) {
                        obj[result] = false;
                        break;
                    } else {
                        obj[result] = result > 1;
                    }
                }
            }
        });
        return obj;
    }
}

const questionTwo = function questionTwo(array) {
    let nonDuplicateArray;
    if (!Array.isArray(array) || array === undefined) {
        return [];
    } else {
        nonDuplicateArray = [...new Set(array)]; // Idea taken from StackOverflow
    }
    return nonDuplicateArray;
}

const questionThree = function questionThree(array) {
    let sortedWord;
    let nextSortedWord;
    let anagramObject = {};
    if (!Array.isArray(array) || array === undefined) {
        return anagramObject;
    } else {
        for (let i = 0; i < array.length; i++) {
            sortedWord = array[i].split('').sort().join('');
            for (let j = i + 1; j < array.length; j++) {
                nextSortedWord = array[j].split('').sort().join('');
                if (i === j || array[i] === array[j]) {
                    continue;
                } else if (sortedWord === nextSortedWord) {
                    if (!anagramObject[sortedWord]) {
                        anagramObject[sortedWord] = [];
                        anagramObject[sortedWord].push(array[i]);
                        anagramObject[sortedWord].push(array[j])
                    }
                }
            }
        }
    }
    return anagramObject;
}

const questionFour = function questionFour(num1, num2, num3) {
    if (num1 === undefined || num2 === undefined || num3 === undefined) {
        return "Oops! Please provide all 3 input parameters for the function..."
    }
    // The idea for the below code snippet for the factorial function was taken from FeeCodeCamp website.
    let fact = (number) => {
        if (number < 0) {
            return "Oops! The number is negative. Please provide a positive number.";
        } else if (number === 0) {
            return 1;
        } else {
            return number * fact(number - 1);
        }
    }

    let avgOriginal = (num1 + num2 + num3) / 3;
    let num1Factorial = fact(num1);
    let num2Factorial = fact(num2);
    let num3Factorial = fact(num3);

    let result = (num1Factorial + num2Factorial + num3Factorial) / avgOriginal;

    return Math.floor(result);
}

module.exports = {
    firstName: "Sushant",
    lastName: "Bhat",
    studentId: "10474365",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};