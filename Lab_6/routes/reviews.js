const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewData = data.reviews;
const { ObjectId } = require('mongodb');

router.get('/:id', async (req, res) => {
    if (!req.params.id || !ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: 'Invalid ObjectID' });
        return;
    }
    try {
        const reviewList = await reviewData.getAll(req.params.id);
        if (!reviewList) {
            res.status(404).json({ error: 'Review Not Found' });
        }
        res.json(reviewList);
    } catch (e) {
        res.status(404).json({ message: 'Review not found' });
    }
});

router.get('/review/:id', async (req, res) => {
    if (!req.params.id || !ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: 'Invalid ObjectID' });
        return;
    }
    try {
        const review = await reviewData.get(req.params.id);
        res.json(review);
    } catch (e) {
        res.status(404).json({ message: 'Review not found' });
    }
});

router.post('/:id', async (req, res) => {
    let reviewDate = /(((0[1-9]|1[0-2])\/([01][1-9]|10|2[0-8]))|((0[13-9]|1[0-2])\/(29|3[01]29|30))|((0[13578]|1[0,2])\/31))\/[0-9]{4}/gim;
    if (typeof req.body.restaurantId !== 'string' || typeof req.body.title !== 'string' || typeof req.body.reviewer !== 'string' || typeof req.body.dateOfReview !== 'string' || typeof req.body.review !== 'string' || typeof req.body.rating !== 'number') {
        throw 'The parameters "name, location, phoneNumber, website, priceRange" must of String type';
    } else if ((req.body.restaurantId.trim()).length === 0 || (req.body.title.trim()).length === 0 || (req.body.reviewer.trim()).length === 0 || (req.body.dateOfReview.trim()).length === 0 || (req.body.review.trim()).length === 0) {
        throw 'The parameters "name, location, phoneNumber, website, priceRange" cannot be empty';
    } else if (!ObjectId.isValid(req.body.restaurantId.trim())) {
        throw 'Invalid ID';
    } else if (!reviewDate.test(req.body.dateOfReview.trim())) {
        throw 'Phone Number must follow the "xxx-xxx-xxxx" format';
    } else if (req.body.rating < 0 || req.body.rating > 5) {
        throw 'Rating should be a number between 1 - 5';
    }
    let providedDate = req.body.dateOfReview;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    providedDate = new Date(providedDate);
    if (providedDate > currentDate) {
        throw 'The date provided is greater than today\'s date';
    } else if (providedDate < currentDate) {
        throw 'The date provided is less than today\'s date';
    }
    // if (!req.params.id || !req.body.title || !req.body.reviewer || !req.body.rating || !req.body.dateOfReview || !req.body.review || !ObjectId.isValid(req.params.id)) {
    //     throw 'All fields must have valid values';
    // }
    const { title, reviewer, rating, dateOfReview, review } = req.body;
    try {
        const newReview = await reviewData.create(req.params.id, title, reviewer, rating, dateOfReview, review);
        res.json(newReview);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.delete('/review/:id', async (req, res) => {
    if (!req.params.id || !ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: 'Invalid ObjectID' });
        return;
    }
    try {
        await reviewData.get(req.params.id);
    } catch (e) {
        res.status(404).json({ error: 'Restaurant not found' });
        return;
    }
    try {
        const review = await reviewData.remove(req.params.id);
        if (!review) {
            res.status(404).json({ error: 'Review Not Found' });
        }
        res.status(200).json(review);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

module.exports = router;