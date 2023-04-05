const sortString = string => {
    let numberArray = [];
    let lowerCaseArray = [];
    let upperCaseArray = [];
    let spaceArray = [];
    let specialCaseArray = [];
    if (string === undefined) {
        throw "Parameters cannot be empty";
    } else if (typeof string !== "string") {
        throw "Only string values are accepted";
    } else if (string.length === 0) {
        throw "String cannot be empty";
    }
    for (let i = 0; i < string.length; i++) {
        if (string[i].charCodeAt() >= 65 && string[i].charCodeAt() <= 90) {
            upperCaseArray.push(string[i]);
        } else if (string[i].charCodeAt() >= 97 && string[i].charCodeAt() <= 122) {
            lowerCaseArray.push(string[i]);
        } else if (string[i].charCodeAt() >= 48 && string[i].charCodeAt() <= 57) {
            numberArray.push(string[i]);
        } else if (string[i].charCodeAt() === 32) {
            spaceArray.push(string[i]);
        } else {
            specialCaseArray.push(string[i]);
        }
    }
    let upper = upperCaseArray.sort().join("");
    let lower = lowerCaseArray.sort().join("");
    let num = numberArray.sort().join("");
    let space = spaceArray.sort().join("");
    let special = specialCaseArray.sort().join("")
    return upper.concat(lower, special, num, space);
}

const replaceChar = (string, idx) => {
    let word;
    let prevChar;
    let nextChar;
    let replaceCount = 0;
    if (string === undefined || idx === undefined) {
        throw "Invalid parameters";
    } else if (typeof string !== "string") {
        throw "Only string values are accepted";
    } else if (string.length === 0) {
        throw "String cannot be empty";
    } else if (typeof idx !== "number") {
        throw "Index should be a number";
    } else if (idx <= 0) {
        throw "Index must be greater than 0";
    } else if (idx >= string.length || idx === string.length - 1) {
        throw "Index should be less than the last index value of the given string";
    } else {
        word = string.split('');
        prevChar = word[idx - 1];
        nextChar = word[idx + 1];
        for (let i = 0; i < word.length; i++) {
            if (word[i] === word[idx] && i !== idx) {
                if (replaceCount === 0) {
                    word[i] = prevChar;
                    replaceCount = 1;
                } else {
                    word[i] = nextChar;
                    replaceCount = 0;
                }
            }
        }
    }
    return word.join('');
}

const mashUp = (string1, string2, char) => {
    if (string1 === undefined || string2 === undefined || char === undefined) {
        throw "Parameters cannot be empty";
    } else if (typeof string1 !== "string" || typeof string2 !== "string" || typeof char !== "string") {
        throw "Only string values are can be passed in all 3 parameters";
    } else if (string1.length === 0 || string2.length === 0 || char.length === 0) {
        throw "None of the parameters can be empty";
    }
    let diff = Math.abs(string1.length - string2.length);
    let padding = new Array(diff).fill(char).join('');
    let firstString = string1;
    let secondString = string2;
    let result = '';
    if (string1.length > string2.length) {
        secondString = string2.concat(padding);
    } else if (string1.length < string2.length) {
        firstString = string1.concat(padding);
    }
    for (let i = 0; i < firstString.length; i++) {
        result += firstString[i] + secondString[i];
    }
    return result;
}

module.exports = {
    "firstName": "Sushant",
    "lastName": "Bhat",
    "studentId": "10474365",
    sortString,
    replaceChar,
    mashUp
}