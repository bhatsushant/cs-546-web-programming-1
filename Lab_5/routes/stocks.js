const express = require('express');
const router = express.Router();
const data = require('../data');
const stocks = data.stocks;

router.get('/:id', async (req, res) => {
    try {
        const stocksJson = await stocks.getStockById(req.params.id);
        res.json(stocksJson);
    } catch (e) {
        res.status(404).json({ message: 'Stock not found' });
    }
});

router.get('/', async (req, res) => {
    try {
        const stocksJson = await stocks.getStocks();
        res.json(stocksJson);
    } catch (e) {
        res.status(404).json({ message: 'Stocks JSON not found' });
    }
});

module.exports = router;