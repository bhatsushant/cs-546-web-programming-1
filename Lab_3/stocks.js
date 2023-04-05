const axios = require('axios');

async function getShareholders() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json');
    return data // this will be the array of people objects
}

async function getPeople() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json');
    return data // this will be the array of people objects
}

async function listShareholders() {
    if (arguments.length > 0) {
        throw 'No arguments can be passed to this function';
    }
    const personData = await getPeople();
    const sharesData = await getShareholders();
    sharesData.forEach(value => {
        value.shareholders.forEach(id => {
            personData.forEach(key => {
                if (key.id === id.userId) {
                    id.first_name = key.first_name;
                    id.last_name = key.last_name;
                    delete id.userId;
                }
            });
        });
    });
    return sharesData;
}

async function topShareholder(stockName) {
    const personData = await getPeople();
    const sharesData = await getShareholders();
    let company, maxShares, userid, username;
    if (typeof stockName !== 'string') {
        throw 'Stock name must be a string';
    } else if ((stockName.trim()).length === 0) {
        throw 'Stock name cannot be empty';
    } else {
        stockName = stockName.trim();
        company = sharesData.find(company => company.stock_name === stockName);
        if (!company) {
            throw 'No such stock name';
        }
        maxShares = Math.max(...company.shareholders.map(o => o.number_of_shares));
        company.shareholders.find(id => {
            if (maxShares === id.number_of_shares) {
                userid = id.userId;
            }
        });
        personData.find(name => {
            if (name.id === userid) {
                username = `${name.first_name} ${name.last_name}`;
            }
        });
    }
    if (maxShares === -Infinity || maxShares === 0 || maxShares === undefined) {
        return `${stockName} currently has no shareholders.`
    }
    return `With ${maxShares} shares in ${stockName}, ${username} is the top shareholder.`;
}

async function listStocks(firstName, lastName) {
    const personData = await getPeople();
    const sharesData = await getShareholders();
    let foundPerson, finalArray = [];
    if (typeof firstName !== 'string' || typeof lastName !== 'string') {
        throw 'Parameters must be string';
    } else if ((firstName.trim()).length === 0 || (lastName.trim()).length === 0) {
        throw 'Parameters cannot be empty';
    } else {
        firstName = firstName.trim();
        lastName = lastName.trim();
        foundPerson = personData.find((key) => key.first_name === firstName && key.last_name === lastName);
    }
    if (foundPerson) {
        sharesData.forEach(key => {
            key.shareholders.forEach(val => {
                if (val.userId === foundPerson.id) {
                    let finalObject = {};
                    finalObject.stock_name = key.stock_name
                    finalObject.number_of_shares = val.number_of_shares;
                    finalArray.push(finalObject);
                }
            });
        });
    } else {
        throw 'Person not found';
    }
    if (finalArray.length === 0) {
        throw 'Person does not own any company shares';
    }
    return finalArray;
}

async function getStockById(id) {
    const sharesData = await getShareholders();
    let stocks;
    if (typeof id !== 'string') {
        throw 'ID must be a string';
    } else if (id.trim().length === 0) {
        throw 'ID cannot be empty';
    } else {
        stocks = sharesData.find(stockid => stockid.id === id)
    }
    if (stocks === undefined) {
        throw 'Stock not found';
    }
    return stocks;
}

module.exports = {
    firstName: "Sushant",
    lastName: "Bhat",
    studentID: "10474365",
    listShareholders,
    getStockById,
    listStocks,
    topShareholder
};