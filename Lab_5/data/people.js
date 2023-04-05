const axios = require('axios');

async function getPeopleData() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json')
    return data;
}

let peopleObject = {
    async getPeople() {
        if (arguments.length !== 0) {
            throw 'This function cannot be passed any arguments';
        }
        const peopleData = await getPeopleData();
        return peopleData;
    },

    async getPersonById(id) {
        const personData = await getPeopleData();
        let personID;
        if (typeof id != 'string') {
            throw 'ID must be a string';
        } else if ((id.trim()).length === 0) {
            throw 'ID cannot be empty';
        } else {
            // id = id.trim();
            personID = personData.find(value => { return value.id === id });
        }
        if (!personID || Object.keys(personID).length === 0) {
            throw 'Person Not Found';
        }
        return personID;
    }
};

module.exports = peopleObject;