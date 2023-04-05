const arrayUtil = require('./arrayUtils');
const stringUtil = require('./stringUtils');
const objectUtil = require('./objUtils');

console.log('---------- arrayUtil.js ----------');
console.log('***** average *****');
try {
    console.log(arrayUtil.average([[1, 2, 3, 4]])); // Returns: 3
} catch (e) {
    console.log(e);
}

try {
    console.log(arrayUtil.average([1, 2, 3, 4])); // throws
} catch (e) {
    console.log(e);
}

console.log('***** modeSquared *****');
try {
    console.log(arrayUtil.modeSquared([1, 2, 3, 3, 4])); // Returns: 9
} catch (e) {
    console.log(e);
}

try {
    console.log(arrayUtil.modeSquared([])); // throws an error
} catch (e) {
    console.log(e);
}

console.log('***** medianElement *****');
try {
    console.log(arrayUtil.medianElement([6, 6, 6, 3, 4, 1, 1, 6, 7, 6, 6])); // Return {'6': 0}
} catch (e) {
    console.log(e);
}

try {
    console.log(arrayUtil.medianElement(5, 6, 7)); // throws error
} catch (e) {
    console.log(e);
}

console.log('***** merge *****');
try {
    console.log(arrayUtil.merge([1, 2, 3, 'g'], ['d', 'a', 's'])); // Returns:['a', 'd', 'g', 's', 1, 2, 3] 
} catch (e) {
    console.log(e);
}

try {
    console.log(arrayUtil.merge([null, null, null], [null, null, null])); // throws
} catch (e) {
    console.log(e);
}

console.log('---------- stringUtil.js ----------');
console.log('***** sortString *****');
try {
    console.log(stringUtil.sortString('123 FOO BAR!')); // Returns: "ABFOOR!123  "
} catch (e) {
    console.log(e);
}

try {
    console.log(stringUtil.sortString()); // throws
} catch (e) {
    console.log(e);
}

console.log('***** replaceChar *****');
try {
    console.log(stringUtil.replaceChar("Daddy", 2)); // Returns: "Daday"
} catch (e) {
    console.log(e);
}

try {
    console.log(stringUtil.replaceChar("foobar", 0)); // throws
} catch (e) {
    console.log(e);
}

console.log('***** mashUp *****');
try {
    console.log(stringUtil.mashUp("hello", "world", "#")); //Returns "hweolrllod"
} catch (e) {
    console.log(e);
}

try {
    console.log(stringUtil.mashUp()); // Throws Error
} catch (e) {
    console.log(e);
}

console.log('---------- objUtil.js ----------');
console.log('***** computeObjects *****');
try {
    console.log(objectUtil.computeObjects([{ x: 2, y: 3 }, { x: 4, z: 1 }], x => x * 2));
} catch (e) {
    console.log(e);
}

try {
    console.log(objectUtil.computeObjects()); // throws
} catch (e) {
    console.log(e);
}

console.log('***** commonKeys *****');
try {
    console.log(objectUtil.commonKeys({ a: 2, b: { x: 7 } }, { a: 3, b: { x: 7, y: 10 } })); // {b: { x: 7}}
} catch (e) {
    console.log(e);
}

try {
    console.log(objectUtil.commonKeys([])); // throws
} catch (e) {
    console.log(e);
}

console.log('***** flipObject *****');
try {
    console.log(objectUtil.flipObject({ 'a': 1, 'b': 2, 'c': { 'z': 1 } }));
} catch (e) {
    console.log(e);
}

try {
    console.log(objectUtil.flipObject()); // throws
} catch (e) {
    console.log(e);
}