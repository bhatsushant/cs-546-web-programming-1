const express = require('express');
const router = express.Router();
const data = require('../data');
const people = data.people;

router.get('/:id', async (req, res) => {
    try {
        const peopleJson = await people.getPersonById(req.params.id);
        res.json(peopleJson);
    } catch (e) {
        res.status(404).json({ message: 'Person not found' });
    }
});

router.get('/', async (req, res) => {
    try {
        const peopleJson = await people.getPeople();
        res.json(peopleJson);
    } catch (e) {
        res.status(404).json({ message: 'People JSON not found' });
    }
});

module.exports = router;