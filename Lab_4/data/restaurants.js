const mongoCollections = require('../config/mongoCollections');
const restaurants = mongoCollections.restaurants;
const { ObjectId } = require('mongodb');

module.exports = {
    async get(id) {
        if (arguments.length !== 1) {
            throw 'An ID parameter must be passed to this function';
        } else if (typeof id !== 'string') {
            throw 'ID must be a string';
        } else if ((id.trim()).length === 0) {
            throw 'ID cannot be empty';
        } else if (!ObjectId.isValid(id.trim())) {
            throw 'Invalid ID';
        }
        let parseId = ObjectId(id);
        const restaurantCollection = await restaurants();
        const restaurant = await restaurantCollection.findOne({ _id: parseId });
        if (restaurant === null) throw 'No restaurant with that ID';
        restaurant._id = id;
        return restaurant;
        // return restaurant.name;
    },

    async create(name, location, phoneNumber, website, priceRange, cuisines, overallRating, serviceOptions) {
        // Regex format implemented using source from StackOverflow
        let phoneFormat = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/;
        let validateWebsite = /^(http(s?):\/\/www\.)(.){5,}(\.com)$/i;
        if (arguments.length !== 8) {
            throw 'All fields need to have valid values';
        } else if (typeof name !== 'string' || typeof location !== 'string' || typeof phoneNumber !== 'string' || typeof website !== 'string' || typeof priceRange !== 'string') {
            throw 'The parameters "name, location, phoneNumber, website, priceRange" must of String type';
        } else if ((name.trim()).length === 0 || (location.trim()).length === 0 || (phoneNumber.trim()).length === 0 || (website.trim()).length === 0 || (priceRange.trim()).length === 0) {
            throw 'The parameters "name, location, phoneNumber, website, priceRange" cannot be empty';
        } else if (!phoneFormat.test(phoneNumber.trim())) {
            throw 'Phone Number must follow the "xxx-xxx-xxxx" format';
        } else if (!validateWebsite.test(website.trim())) {
            throw 'Invalid URL';
        } else if (priceRange.length < 1 || priceRange.length > 4) {
            throw 'Price must range between "$" and "$$$$"';
        } else if (priceRange !== '$' && priceRange !== '$$' && priceRange !== '$$$' && priceRange !== '$$$$') {
            throw 'Price Range must be between "$ - $$$$"';
        } else if (typeof overallRating !== 'number') {
            throw 'Rating parameter should be a number';
        } else if (overallRating < 1 || overallRating > 5) {
            throw 'Rating should be between 1 and 5';
        } else if (!Array.isArray(cuisines) || cuisines.length < 1) {
            throw 'Cuisines must contain an array of strings';
        } else if (typeof serviceOptions !== 'object' || Array.isArray(serviceOptions)) {
            throw 'Service Options must be an object';
        } else if (typeof serviceOptions.dineIn !== 'boolean' || typeof serviceOptions.takeOut !== 'boolean' || typeof serviceOptions.delivery !== 'boolean') {
            throw 'Invalid Service Option Values';
        }
        cuisines.forEach(item => {
            if (typeof item !== 'string') {
                throw 'Cuisines must contain an array of strings';
            } else if ((item.trim()).length < 1) {
                throw 'Cuisines cannot contain empty strings';
            }
        });
        for (let key in serviceOptions) {
            if (key !== 'dineIn' && key !== 'takeOut' && key !== 'delivery') {
                throw 'Service Options must have either "dineIn", "takeOut" or "delivery" as keys';
            }
        }

        const restaurantCollection = await restaurants();
        const restName = await restaurantCollection.findOne({ name: name });
        const restLocation = await restaurantCollection.findOne({ location: location });
        const restNumber = await restaurantCollection.findOne({ phoneNumber: phoneNumber });

        if (restName !== null && restLocation !== null && restNumber !== null) {
            throw 'Restaurant already exists';
        }

        let newRestaurant = {
            name: name,
            location: location,
            phoneNumber: phoneNumber,
            website: website,
            priceRange: priceRange,
            cuisines: cuisines,
            overallRating: overallRating,
            serviceOptions: serviceOptions
        }

        const insertInfo = await restaurantCollection.insertOne(newRestaurant);
        // console.log(insertInfo);
        if (insertInfo.insertedCount === 0) throw 'Could not add restaurant';
        newRestaurant._id = insertInfo.insertedId.toString();

        return newRestaurant;
    },

    async getAll() {
        let restaurantList = [];
        if (arguments.length !== 0) {
            throw 'This function has no arguments';
        }
        const restaurantCollection = await restaurants();
        restaurantList = await restaurantCollection.find({}).toArray();
        restaurantList.forEach(key => {
            key._id = key._id.toString();
        });
        return restaurantList;
    },

    async remove(id) {
        if (arguments.length !== 1) {
            throw 'An ID parameter must be passed to this function';
        } else if (typeof id !== 'string') {
            throw 'ID must be a string';
        } else if ((id.trim()).length === 0) {
            throw 'ID cannot be empty';
        } else if (!ObjectId.isValid(id.trim())) {
            throw 'Invalid ID';
        }
        let parseId = ObjectId(id);
        const restaurantCollection = await restaurants();
        const restaurant = await restaurantCollection.findOne({ _id: parseId });
        if (restaurant === null) throw 'No restaurant with that ID';
        const deletedRestaurant = await restaurantCollection.deleteOne({ _id: parseId });

        if (deletedRestaurant.deletedCount === 0) {
            throw `Could not delete restaurant with id of ${id}`;
        }
        return `${restaurant.name} has been successfully deleted!`;
    },

    async rename(id, newWebsite) {
        let validateWebsite = /^(http(s?):\/\/www\.)(.){5,}(\.com)$/i;
        if (arguments.length !== 2) {
            throw 'An ID parameter must be passed to this function';
        } else if (typeof id !== 'string') {
            throw 'ID must be a string';
        } else if ((id.trim()).length === 0) {
            throw 'ID cannot be empty';
        } else if (!ObjectId.isValid(id.trim())) {
            throw 'Invalid ID';
        } else if (typeof newWebsite !== 'string') {
            throw 'Website must be provided as a string';
        } else if (!validateWebsite.test(newWebsite.trim())) {
            throw 'Invalid URL';
        }
        let parseId = ObjectId(id);
        const restaurantCollection = await restaurants();
        const restaurant = await restaurantCollection.findOne({ _id: parseId });
        if (restaurant.website.toLowerCase() === newWebsite.toLowerCase()) {
            throw 'Website already exists';
        }
        const updateRest = {
            website: newWebsite
        };

        const updatedRestaurant = await restaurantCollection.updateOne(
            { _id: parseId }, { $set: updateRest }
        );
        if (updatedRestaurant.modifiedCount === 0) {
            throw 'No restaurant found to update';
        }
        let renamedObject = await this.get(id);
        return renamedObject;
    }
}