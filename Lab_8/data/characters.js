const axios = require('axios');
const md5 = require('blueimp-md5');
const publickey = '7003b16424d2b557acc3eb7c98a2f843';
const privatekey = 'f739f546d5d51c679093540741144f66861dcf9e';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';

let exportedMethods = {
    async searchCharacters(searchTerm) {
        // if (!searchTerm || typeof searchTerm !== 'string' || searchTerm.trim() === '' || searchTerm.trim().length === 0) {
        //     // throw { code: 400, message: `Invalid search term.` };
        //     throw `Invalid search term.`;
        // }
        const url = baseUrl + '?nameStartsWith=' + searchTerm + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
        const { data } = await axios.get(url);
        const result = data.data.results.slice(0, 20);
        // if (results.length === 0) {
        //     // throw { code: 404, message: `We're sorry, but no results were found for ${searchTerm}.` }
        //     throw `We're sorry, but no results were found for ${searchTerm}.`
        // }
        return result;
    },

    async searchCharById(id) {
        // if (!id || typeof id !== 'string' || id.trim() === '' || id.trim.length !== 0) {
        //     // throw { code: 400, message: `Invalid ID.` };
        //     throw `Invalid ID.`;
        // }
        const url = baseUrl + '/' + id + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
        const { data } = await axios.get(url);
        return data;
    }
}

module.exports = exportedMethods;