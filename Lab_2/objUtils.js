const computeObjects = (array, func) => {
    let computedObject = {};
    if (!Array.isArray(array) || array.length === 0) {
        throw "Please provide an array of objects as first parameter and a function as second parameter";
    } else if (typeof func != 'function') {
        throw 'Please provide function as the second parameter';
    }
    else {
        array.forEach(element => {
            if (typeof element !== "object" || Array.isArray(element)) {
                throw "Nested elements should be an object of numbers";
            } else if (Object.keys(element).length === 0) {
                throw "Objects cannot be empty";
            }
            for (let key in element) {
                if (key in computedObject) {
                    computedObject[key] += element[key];
                } else {
                    computedObject[key] = element[key];
                }
            }
        });

    } for (let key in computedObject) {
        computedObject[key] = func(computedObject[key]);
    }
    return computedObject;
}

const commonKeys = (object1, object2) => {
    let finalObject = {};
    if (typeof object1 !== "object" || typeof object2 !== "object" || Array.isArray(object1) || Array.isArray(object2)) {
        throw "Both the parameters should be objects";
    }
    for (let key in object1) {
        if (typeof object1[key] === 'object' && !Array.isArray(object1) && !Array.isArray(object2)) {
            finalObject[key] = commonKeys(object1[key], object2[key]);
        }
        if (object1[key] === object2[key]) {
            finalObject[key] = object1[key];
        }
    }
    return finalObject;
}

const flipObject = object => {
    const flippedObject = {}
    if (typeof object !== 'object') {
        throw 'Parameter should be an object';
    } else if (typeof object === 'object' && !Array.isArray(object)) {
        Object.keys(object).forEach(key => {
            if (typeof object[key] === 'object' && Object.keys(object[key]).length === 0) {
                throw 'Nested object cannot be empty';
            } else if (Array.isArray(object[key]) && object[key].length === 0) {
                throw 'Nested arrays cannot be empty';
            } else if (typeof object[key] === 'object' && Object.keys(object[key]).length !== 0 && !Array.isArray(object[key])) {
                flippedObject[key] = flipObject(object[key]);
            } else if (Array.isArray(object[key]) && object[key].length !== 0) {
                object[key].forEach(value => {
                    flippedObject[value] = key;
                });
            } else {
                flippedObject[object[key]] = key;
            }
        });
    }
    return flippedObject;
}

module.exports = {
    "firstName": "Sushant",
    "lastName": "Bhat",
    "studentId": "10474365",
    computeObjects,
    commonKeys,
    flipObject
};