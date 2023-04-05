const express = require('express');
const router = express.Router();
const data = require('../data');
const charData = data.characters;

router.get('/', async (req, res) => {
    res.render('characters/index', { title: 'Character Finder' });
});

router.post('/search', async (req, res) => {
    let term = req.body;
    try {
        const chars = await charData.searchCharacters(term.searchTerm);
        res.render('characters/chars', { title: 'Character Found', searchTerm: term.searchTerm, charsList: chars });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.get('/characters/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let c = await charData.searchCharById(id);
        const chars = await charData.searchCharById(id);
        res.render('characters/id', { c: c.data.results });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

module.exports = router;