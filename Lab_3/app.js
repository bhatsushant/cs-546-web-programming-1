const people = require("./people");
const stocks = require("./stocks");

async function main() {
    try {
        const peopledata = await people.getPersonById("20035a09-3820-4f49-bb8f-d947cebee537");
        console.log(peopledata);
    } catch (e) {
        console.log(e);
    }

    try {
        const peopledata = await people.getPersonById();
        console.log(peopledata);
    } catch (e) {
        console.log(e);
    }

    try {
        const matchingPeople = await people.sameStreet("Sutherland", "Point");
        console.log(matchingPeople);
    } catch (e) {
        console.log(e);
    }

    try {
        const matchingPeople = await people.sameStreet('   ', '   ');
        matchingPeople.forEach(key => {
            console.dir(key, { depth: null });
        });
    } catch (e) {
        console.log(e);
    }

    try {
        const ssn = await people.manipulateSsn();
        console.log(ssn);
    } catch (e) {
        console.log(e);
    }

    try {
        const ssn = await people.manipulateSsn('abc', 1);
        console.log(ssn);
    } catch (e) {
        console.log(e);
    }

    try {
        const sameDay = await people.sameBirthday(9, 25);
        console.log(sameDay);
    } catch (e) {
        console.log(e);
    }

    try {
        const sameDay = await people.sameBirthday(-1, 31);
        console.log(sameDay);
    } catch (e) {
        console.log(e);
    }

    try {
        const listShare = await stocks.listShareholders();
        console.log(listShare);
    } catch (e) {
        console.log(e);
    }

    try {
        const listShare = await stocks.listShareholders('Nuveen Preferred and Income 2022 Term Fund');
        console.log(listShare);
    } catch (e) {
        console.log(e);
    }

    try {
        const topShare = await stocks.topShareholder('Aeglea BioTherapeutics, Inc.');
        console.log(topShare);
    } catch (e) {
        console.log(e);
    }

    try {
        const topShare = await stocks.topShareholder();
        console.log(topShare);
    } catch (e) {
        console.log(e);
    }

    try {
        const list = await stocks.listStocks("Grenville", "Pawelke");
        console.log(list);
    } catch (e) {
        console.log(e);
    }

    try {
        const list = await stocks.listStocks(1, 2);
        console.log(list);
    } catch (e) {
        console.log(e);
    }

    try {
        const getStocks = await stocks.getStockById("f652f797-7ca0-4382-befb-2ab8be914ff0");
        console.log(getStocks);
    } catch (e) {
        console.log(e);
    }

    try {
        const getStocks = await stocks.getStockById();
        console.log(getStocks);
    } catch (e) {
        console.log(e);
    }
}

//call main
main();