const axios = require('axios');

async function getPeople() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json');
    return data // this will be the array of people objects
}

async function getPersonById(id) {
    const personData = await getPeople();
    let personID;
    if (typeof id != 'string') {
        throw 'ID must be a string';
    } else if ((id.trim()).length === 0) {
        throw 'ID cannot be empty';
    } else {
        id = id.trim();
        personID = personData.find(value => { return value.id === id });
    }
    if (!personID || Object.keys(personID).length === 0) {
        throw 'Person Not Found';
    }
    return personID;
}

async function sameStreet(streetName, streetSuffix) {
    const personData = await getPeople();
    let matchingPerson = [];
    if (streetName === undefined || streetSuffix === undefined) {
        throw 'Invalid parameter';
    } else if (typeof streetName !== 'string' || typeof streetSuffix !== 'string') {
        throw 'Both parameters must be a string';
    } else if ((streetName.trim()).length === 0 || (streetSuffix.trim()).length === 0) {
        throw 'Street Name and Street Suffix cannot be empty';
    } else {
        streetName = streetName.trim().toLocaleLowerCase();
        streetSuffix = streetSuffix.trim().toLocaleLowerCase();
        personData.filter(value => {
            if ((value.address.home.street_name.toLocaleLowerCase() === streetName && value.address.home.street_suffix.toLocaleLowerCase() === streetSuffix) || (value.address.work.street_name.toLocaleLowerCase() === streetName && value.address.work.street_suffix.toLocaleLowerCase() === streetSuffix)) {
                matchingPerson.push(value);
            }
        });
    }
    if (matchingPerson.length < 2) {
        throw 'No two persons live or work on the same street or suffix provided';
    }
    return matchingPerson;
}

async function manipulateSsn() {
    if (arguments.length > 0) {
        throw 'No arguments can be passed to this function';
    }
    const personData = await getPeople();
    const reducer = (acc, key) => acc + key;
    let max, min, avg;
    const sortedSsn = [];
    const computedObject = {};
    computedObject.highest = {};
    computedObject.lowest = {};
    personData.forEach(element => {
        sortedSsn.push(parseInt(element.ssn.split('-').sort().join('').split('').sort().join('')));
    });
    max = sortedSsn.indexOf(Math.max(...sortedSsn));
    min = sortedSsn.indexOf(Math.min(...sortedSsn));
    computedObject.highest.firstName = personData[max].first_name;
    computedObject.highest.lastName = personData[max].last_name;
    computedObject.lowest.firstName = personData[min].first_name;
    computedObject.lowest.lastName = personData[min].last_name;
    avg = Math.floor(sortedSsn.reduce(reducer) / sortedSsn.length);
    computedObject.average = avg;
    return computedObject;
}

async function sameBirthday(month, day) {
    month = Number(month);
    day = Number(day);
    const people = [];
    let mm, dd;
    const personData = await getPeople();
    if (month === undefined || day === undefined) {
        throw 'Paramaters cannot be empty';
    } else if (isNaN(month) || isNaN(day)) {
        throw 'Invalid parameters';
    } else if (month < 1 || month > 12) {
        throw 'Invalid month';
    } else if ((day < 0 || day > 30)) {
        throw 'Invalid Day'
    } else if ((day < 0 || day > 30) && (month === 2 || month === 4 || month === 6 || month === 9 || month === 11)) {
        throw 'Invalid day for the given month';
    } else if ((month === 2) && (day < 0 || day >= 29)) {
        throw 'Feb does not have more than 29 days, does it?';
    } else {
        personData.filter(value => {
            mm = Number(value.date_of_birth.split('/')[0]);
            dd = Number(value.date_of_birth.split('/')[1]);
            if (mm === month && dd === day) {
                people.push(`${value.first_name} ${value.last_name}`);
            }
        });
    }
    return people;
}

module.exports = {
    firstName: "Sushant",
    lastName: "Bhat",
    studentID: "10474365",
    getPersonById,
    sameStreet,
    manipulateSsn,
    sameBirthday
};