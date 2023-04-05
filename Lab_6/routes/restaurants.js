const { ObjectId } = require('bson');
const express = require('express');
const router = express.Router();
const data = require('../data');
const restaurantData = data.restaurants;

router.get('/', async (req, res) => {
    try {
        const restaurantList = await restaurantData.getAll();
        res.json(restaurantList);
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/:id', async (req, res) => {
    if (!req.params.id || !ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: 'Invalid ObjectID' });
        return;
    }
    try {
        const restaurant = await restaurantData.get(req.params.id);
        res.json(restaurant);
    } catch (e) {
        res.status(404).json({ message: 'Restaurant not found' });
    }
});

router.post('/', async (req, res) => {
    let phoneFormat = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/;
    let validateWebsite = /^(http(s?):\/\/www\.)(.){5,}(\.com)$/i;
    if (typeof req.body.name !== 'string' || typeof req.body.location !== 'string' || typeof req.body.phoneNumber !== 'string' || typeof req.body.website !== 'string' || typeof req.body.priceRange !== 'string') {
        res.status(400).json({ error: 'The parameters "name, location, phoneNumber, website, priceRange" must of String type' });
        return;
    } else if ((req.body.name.trim()).length === 0 || (req.body.location.trim()).length === 0 || (req.body.phoneNumber.trim()).length === 0 || (req.body.website.trim()).length === 0 || (req.body.priceRange.trim()).length === 0) {
        res.status(400).json({ error: 'Empty parameters not allowed' });
        return;
    } else if (!phoneFormat.test(req.body.phoneNumber.trim())) {
        res.status(400).json({ error: 'Phone Number must follow the "xxx-xxx-xxxx" format' });
        return;
    } else if (!validateWebsite.test(req.body.website.trim())) {
        res.status(400).json({ error: 'Invalid URL' });
        return;
    } else if (req.body.priceRange.length < 1 || req.body.priceRange.length > 4) {
        res.status(400).json({ error: 'Price must range between "$" and "$$$$"' });
        return;
    } else if (req.body.priceRange !== '$' && req.body.priceRange !== '$$' && req.body.priceRange !== '$$$' && req.body.priceRange !== '$$$$') {
        res.status(400).json({ error: 'Price Range must be between "$ - $$$$"' });
        return;
    } else if (!Array.isArray(req.body.cuisines) || req.body.cuisines.length < 1) {
        res.status(400).json({ error: 'Cuisines must contain an array of strings' });
        return;
    } else if (typeof req.body.serviceOptions !== 'object' || Array.isArray(req.body.serviceOptions)) {
        res.status(400).json({ error: 'Service Options must be an object' });
        return;
    } else if (typeof req.body.serviceOptions.dineIn !== 'boolean' || typeof req.body.serviceOptions.takeOut !== 'boolean' || typeof req.body.serviceOptions.delivery !== 'boolean') {
        res.status(400).json({ error: 'Invalid Service Option Values' });
        return;
    }
    req.body.cuisines.forEach(item => {
        if (typeof item !== 'string') {
            res.status(400).json({ error: 'Cuisines must contain an array of strings' });
            return;
        } else if ((item.trim()).length < 1) {
            res.status(400).json({ error: 'Cuisines cannot contain empty strings' });
            return;
        }
    });
    for (let key in req.body.serviceOptions) {
        if (key !== 'dineIn' && key !== 'takeOut' && key !== 'delivery') {
            res.status(400).json({ error: 'Service Options must have either "dineIn", "takeOut" or "delivery" as keys' });
            return;
        }
    }
    // if (!req.body.name || !req.body.location || !req.body.phoneNumber || !req.body.website || !req.body.priceRange || !req.body.cuisines || !req.body.serviceOptions) {
    //     res.status(400).json({ error: 'All fields must have valid values' });
    //     return;
    // }
    const { name, location, phoneNumber, website, priceRange, cuisines, serviceOptions } = req.body;
    try {
        const restaurant = await restaurantData.create(name, location, phoneNumber, website, priceRange, cuisines, serviceOptions);
        res.json(restaurant);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.put('/:id', async (req, res) => {
    let phoneFormat = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/;
    let validateWebsite = /^(http(s?):\/\/www\.)(.){5,}(\.com)$/i;
    if (typeof req.params.id !== 'string' || typeof req.body.name !== 'string' || typeof req.body.location !== 'string' || typeof req.body.phoneNumber !== 'string' || typeof req.body.website !== 'string' || typeof req.body.priceRange !== 'string') {
        res.status(400).json({ error: 'The parameters "id, name, location, phoneNumber, website, priceRange" must of String type' });
        return;
    } else if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: 'Invalid ObjectID' });
        return;
    } else if ((req.body.name.trim()).length === 0 || (req.body.location.trim()).length === 0 || (req.body.phoneNumber.trim()).length === 0 || (req.body.website.trim()).length === 0 || (req.body.priceRange.trim()).length === 0) {
        res.status(400).json({ error: 'Empty parameters not allowed' });
        return;
    } else if (!phoneFormat.test(req.body.phoneNumber.trim())) {
        res.status(400).json({ error: 'Phone Number must follow the "xxx-xxx-xxxx" format' });
        return;
    } else if (!validateWebsite.test(req.body.website.trim())) {
        res.status(400).json({ error: 'Invalid URL' });
        return;
    } else if (req.body.priceRange.length < 1 || req.body.priceRange.length > 4) {
        res.status(400).json({ error: 'Price must range between "$" and "$$$$"' });
        return;
    } else if (req.body.priceRange !== '$' && req.body.priceRange !== '$$' && req.body.priceRange !== '$$$' && req.body.priceRange !== '$$$$') {
        res.status(400).json({ error: 'Price Range must be between "$ - $$$$"' });
        return;
    } else if (!Array.isArray(req.body.cuisines) || req.body.cuisines.length < 1) {
        res.status(400).json({ error: 'Cuisines must contain an array of strings' });
        return;
    } else if (typeof req.body.serviceOptions !== 'object' || Array.isArray(req.body.serviceOptions)) {
        res.status(400).json({ error: 'Service Options must be an object' });
        return;
    } else if (typeof req.body.serviceOptions.dineIn !== 'boolean' || typeof req.body.serviceOptions.takeOut !== 'boolean' || typeof req.body.serviceOptions.delivery !== 'boolean') {
        res.status(400).json({ error: 'Invalid Service Option Values' });
        return;
    }
    req.body.cuisines.forEach(item => {
        if (typeof item !== 'string') {
            res.status(400).json({ error: 'Cuisines must contain an array of strings' });
            return;
        } else if ((item.trim()).length < 1) {
            res.status(400).json({ error: 'Cuisines cannot contain empty strings' });
            return;
        }
    });
    for (let key in req.body.serviceOptions) {
        if (key !== 'dineIn' && key !== 'takeOut' && key !== 'delivery') {
            res.status(400).json({ error: 'Service Options must have either "dineIn", "takeOut" or "delivery" as keys' });
            return;
        }
    }
    // if (!req.params.id || !ObjectId.isValid(req.params.id) || !req.body.name || !req.body.location || !req.body.phoneNumber || !req.body.website || !req.body.priceRange || !req.body.cuisines || !req.body.serviceOptions) {
    //     res.status(400).json({ error: 'All fields must have valid values' });
    //     return;
    // }
    const { name, location, phoneNumber, website, priceRange, cuisines, serviceOptions } = req.body;
    try {
        const restaurant = await restaurantData.update(req.params.id, name, location, phoneNumber, website, priceRange, cuisines, serviceOptions);
        res.json(restaurant);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.delete('/:id', async (req, res) => {
    if (!req.params.id || !ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: 'Invalid ObjectID' });
        return;
    }
    try {
        await restaurantData.get(req.params.id);
    } catch (e) {
        res.status(404).json({ error: 'Restaurant not found' });
        return;
    }
    try {
        const rest = await restaurantData.remove(req.params.id);
        res.json(rest);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

module.exports = router;