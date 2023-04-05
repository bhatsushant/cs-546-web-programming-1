const average = array => {
    const reducer = (acc, key) => acc + key;
    let nestedAverage = 0;
    let totalAverage = 0;
    if (!Array.isArray(array) || array.length === 0) {
        throw "Please provide an array of arrays as input";
    } else {
        array.forEach(element => {
            if (!Array.isArray(element) || element.length === 0) {
                throw "Nested elements should be array of numbers";
            } else {
                element.forEach(value => {
                    if (typeof value !== "number") {
                        throw "Only numbers are allowed inside nested arrays";
                    }
                });
            }
            nestedAverage += Math.round(element.reduce(reducer) / element.length);
        });
        totalAverage = Math.round(nestedAverage / array.length);
    }
    return totalAverage;
}

const modeSquared = array => {
    let counterObject = {};
    let modeArray = [];
    let highestOccurence = 0;
    let squaredMode = 0;
    if (!Array.isArray(array) || array.length === 0) {
        throw "Please provide an array of numbers as input";
    } else {
        array.forEach(element => {
            if (typeof element !== "number") {
                throw "Values inside the arrays must be numbers";
            }
            else if (!counterObject[element]) {
                counterObject[element] = 1;
            } else {
                counterObject[element] += 1;
            }
        });
        for (let key in counterObject) {
            if (counterObject[key] > highestOccurence) {
                modeArray = [Number(key)];
                highestOccurence = counterObject[key];
            } else if (counterObject[key] === highestOccurence) {
                modeArray.push(Number(key));
            }
        }
        if (highestOccurence === 1) return 0;
    }
    if (modeArray.length === 1) {
        squaredMode = Math.pow(modeArray[0], 2);
    } else {
        modeArray.forEach(value => {
            squaredMode += Math.pow(value, 2);
        });
    }
    return squaredMode;
}

const medianElement = array => {
    let median;
    let medianObject = {};
    let firstIndex = 0;
    let secondIndex = 0;
    if (!Array.isArray(array) || array.length === 0) {
        throw "Please provide an array of numbers as input";
    } else {
        array.forEach(element => {
            if (typeof element !== "number") {
                throw "Values inside the arrays must be numbers";
            }
        });
        let sortedInput = [...array];
        sortedInput.sort((a, b) => a - b);
        //debugger;
        if (sortedInput.length % 2 !== 0) {
            median = sortedInput[Math.floor(sortedInput.length / 2)];
            medianObject[median] = array.indexOf(median);
        } else {
            firstIndex = array.indexOf(sortedInput[(sortedInput.length / 2)]);
            secondIndex = array.indexOf(sortedInput[(sortedInput.length / 2 - 1)]);
            median = (sortedInput[(sortedInput.length / 2)] + sortedInput[(sortedInput.length / 2 - 1)]) / 2;
            if (firstIndex > secondIndex) {
                medianObject[median] = firstIndex;
            } else {
                medianObject[median] = secondIndex;
            }
        }
        if (!array.includes(median)) {
            firstIndex = array.lastIndexOf(sortedInput[(sortedInput.length / 2)]);
            secondIndex = array.lastIndexOf(sortedInput[(sortedInput.length / 2 - 1)]);
            median = (sortedInput[(sortedInput.length / 2)] + sortedInput[(sortedInput.length / 2 - 1)]) / 2;
            if (firstIndex > secondIndex) {
                medianObject[median] = firstIndex;
            } else {
                medianObject[median] = secondIndex;
            }
        }
    }
    return medianObject;
}

const merge = (arrayOne, arrayTwo) => {
    let numberArray = [];
    let lowerCaseArray = [];
    let upperCaseArray = [];
    if (!Array.isArray(arrayOne) || !Array.isArray(arrayTwo)) {
        throw "There should be two array parameters";
    } else if (arrayOne.length === 0 || arrayTwo.length === 0) {
        throw "Arrays cannot be empty";
    } else {
        arrayOne.forEach(value => {
            if (typeof value !== "number" && typeof value != "string") {
                throw "The value can be a number or a char"
            } else if (typeof value === "string" && value.length > 1) {
                throw "String cannot exceed 1 character"
            } else if (typeof value === "string" && value.length === 0) {
                throw "String cannot be empty"
            } else if (typeof value === "string" && (value.charCodeAt() < 65 || (91 <= value.charCodeAt() >= 96) || value.charCodeAt() > 122)) {
                throw "Invalid character"
            }
        });
        arrayOne.forEach(value => {
            if (typeof value === "number") {
                numberArray.push(value);
            } else if (value.charCodeAt() >= 65 && value.charCodeAt() <= 90) {
                upperCaseArray.push(value);
            } else if (value.charCodeAt() >= 97 && value.charCodeAt() <= 122) {
                lowerCaseArray.push(value);
            }
        });
        arrayTwo.forEach(value => {
            if (typeof value === "number") {
                numberArray.push(value);
            } else if (value.charCodeAt() >= 65 && value.charCodeAt() <= 90) {
                upperCaseArray.push(value);
            } else if (value.charCodeAt() >= 97 && value.charCodeAt() <= 122) {
                lowerCaseArray.push(value);
            }
        });
        numberArray.sort((a, b) => a - b);
        lowerCaseArray.sort();
        upperCaseArray.sort();
        return lowerCaseArray.concat(upperCaseArray, numberArray);
    }
}

module.exports = {
    "firstName": "Sushant",
    "lastName": "Bhat",
    "studentId": "10474365",
    average,
    modeSquared,
    medianElement,
    merge
};