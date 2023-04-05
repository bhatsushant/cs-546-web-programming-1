const axios = require('axios');

async function getStocksData() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json')
    return data;
}

let stocksObject = {
    async getStocks() {
        if (arguments.length !== 0) {
            throw 'This function cannot be passed any arguments';
        }
        const stocksData = await getStocksData();
        return stocksData;
    },

    async getStockById(id) {
        const sharesData = await getStocksData();
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
};


module.exports = stocksObject;