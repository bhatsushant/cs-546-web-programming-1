const mongoCollections = require('../config/mongoCollections');
const restaurants = mongoCollections.restaurants;
const { ObjectId } = require('mongodb');

module.exports = {
    async create(restaurantId, title, reviewer, rating, dateOfReview, review) {
        let sum = 0, average = 0;
        let reviewDate = /(((0[1-9]|1[0-2])\/([01][1-9]|10|2[0-8]))|((0[13-9]|1[0-2])\/(29|3[01]29|30))|((0[13578]|1[0,2])\/31))\/[0-9]{4}/gim;
        if (arguments.length !== 6) {
            throw 'All fields need to have valid values';
        } else if (typeof restaurantId !== 'string' || typeof title !== 'string' || typeof reviewer !== 'string' || typeof dateOfReview !== 'string' || typeof review !== 'string' || typeof rating !== 'number') {
            throw 'The parameters "name, location, phoneNumber, website, priceRange" must of String type';
        } else if ((restaurantId.trim()).length === 0 || (title.trim()).length === 0 || (reviewer.trim()).length === 0 || (dateOfReview.trim()).length === 0 || (review.trim()).length === 0) {
            throw 'The parameters "name, location, phoneNumber, website, priceRange" cannot be empty';
        } else if (!ObjectId.isValid(restaurantId.trim())) {
            throw 'Invalid ID';
        } else if (!reviewDate.test(dateOfReview.trim())) {
            throw 'Phone Number must follow the "xxx-xxx-xxxx" format';
        } else if (rating < 0 || rating > 5) {
            throw 'Rating should be a number between 1 - 5';
        }
        let providedDate = dateOfReview;
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        providedDate = new Date(providedDate);
        if (providedDate > currentDate) {
            throw 'The date provided is greater than today\'s date';
        } else if (providedDate < currentDate) {
            throw 'The date provided is less than today\'s date';
        }
        let parseId = ObjectId(restaurantId);
        const restaurantCollection = await restaurants();
        const restaurant = await restaurantCollection.findOne({ _id: parseId });
        // console.log(restaurant);
        if (restaurant === null) throw 'No restraunt with that ID';

        const newReview = {
            _id: new ObjectId(),
            title: title,
            reviewer: reviewer,
            rating: rating,
            dateOfReview: dateOfReview,
            review: review
        };

        let updatedRestaurant = await restaurantCollection.updateOne(
            { _id: parseId }, { $push: { reviews: newReview } }
        );
        if (updatedRestaurant.modifiedCount === 0) {
            throw 'No restaurant found to update';
        }
        const reviews = await this.getAll(restaurantId);
        // console.log("reviews", reviews);
        for (let review of reviews) {
            // console.log("review", review);
            // console.log("review.rating", review.rating);
            sum += review.rating;
            // console.log("sum", sum);
        }
        average = sum / reviews.length;
        // console.log("finalSum", sum);
        // console.log("review.length", reviews.length);
        // console.log("average", average);
        const updateRating = await restaurantCollection.updateOne(
            { _id: parseId },
            { $set: { overallRating: Number(average) } }
        );
        // console.log(updateRating);
        // const restaurant = await restaurantCollection.findOne({ _id: parseId });
        const newData = await restaurantCollection.findOne({ _id: parseId });
        newData._id = newData._id.toString();
        newData.reviews.forEach(key => {
            key._id = key._id.toString();
        });
        return newData;
    },

    async getAll(restaurantId) {
        if (arguments.length !== 1) {
            throw 'An ID parameter must be passed to this function';
        } else if (typeof restaurantId !== 'string') {
            throw 'ID must be a string';
        } else if ((restaurantId.trim()).length === 0) {
            throw 'ID cannot be empty';
        } else if (!ObjectId.isValid(restaurantId.trim())) {
            throw 'Invalid ID';
        }
        let parseId = ObjectId(restaurantId);
        const restaurantCollection = await restaurants();
        const restaurant = await restaurantCollection.findOne({ _id: parseId });
        if (restaurant === null) throw 'No restaurant with that ID';
        restaurant.reviews.forEach(key => {
            key._id = key._id.toString();
        });
        // console.log(restaurant.reviews);
        return restaurant.reviews;
    },

    async get(reviewId) {
        if (arguments.length !== 1) {
            throw 'An ID parameter must be passed to this function';
        } else if (typeof reviewId !== 'string') {
            throw 'ID must be a string';
        } else if ((reviewId.trim()).length === 0) {
            throw 'ID cannot be empty';
        } else if (!ObjectId.isValid(reviewId.trim())) {
            throw 'Invalid ID';
        }
        let parseId = ObjectId(reviewId);
        const restaurantCollection = await restaurants();
        const review = await restaurantCollection.aggregate([{ $unwind: "$reviews" },
        { $match: { "reviews._id": parseId } }, { "$replaceRoot": { "newRoot": "$reviews" } }]).toArray();
        // const review = await restaurantCollection.aggregate([
        //     // Get just the docs that contain a shapes element where color is 'red'
        //     { $match: { 'reviews.reviewId': parseId } },
        //     {
        //         $project: {
        //             review: {
        //                 $filter: {
        //                     input: '$reviews',
        //                     as: 'review',
        //                     cond: { $eq: ['$$review.reviewId', parseId] }
        //                 }
        //             },
        //             _id: 0
        //         }
        //     }
        // ]).toArray();
        if (review === null) throw 'No review with that ID';
        review.forEach(key => {
            key.reviewId = reviewId;
        });
        // console.log(review[0]);
        return review[0];
    },

    async remove(reviewId) {
        let sum = 0, average = 0;
        if (arguments.length !== 1) {
            throw 'An ID parameter must be passed to this function';
        } else if (typeof reviewId !== 'string') {
            throw 'ID must be a string';
        } else if ((reviewId.trim()).length === 0) {
            throw 'ID cannot be empty';
        } else if (!ObjectId.isValid(reviewId.trim())) {
            throw 'Invalid ID';
        }
        let parseId = ObjectId(reviewId);
        const restaurantCollection = await restaurants();
        const restData = await restaurantCollection.findOne({ 'reviews._id': parseId });
        if (!restData) return;
        const deleted = await restaurantCollection.updateMany({}, { $pull: { reviews: { _id: parseId } } });
        const reviews = await this.getAll(restData._id.toString());
        for (let key of reviews) {
            sum += key.rating;
        }
        // console.log(sum);
        average = sum / reviews.length;
        // console.log(average);
        // console.log(reviews.length);

        const updateRating = await restaurantCollection.updateOne({ _id: restData._id }, { $set: { overallRating: Number(average) } }
        );

        let result = { "reviewId": reviewId, deleted: true };
        if (deleted.modifiedCount > 0) {
            // console.log(result);
            return result;
        } else {
            throw 'Could not delete review';
        }
    }
};