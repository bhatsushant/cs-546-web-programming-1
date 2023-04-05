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
        restaurant.reviews.forEach(key => {
            key._id = key._id.toString();
        });
        return restaurant;
    },

    async create(name, location, phoneNumber, website, priceRange, cuisines, serviceOptions) {
        // Regex format implemented using source from StackOverflow
        let phoneFormat = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/;
        let validateWebsite = /^(http(s?):\/\/www\.)(.){5,}(\.com)$/i;
        if (arguments.length !== 7) {
            throw 'All fields need to have valid values';
        } else if (typeof name !== 'string' || typeof location !== 'string' || typeof phoneNumber !== 'string' || typeof website !== 'string' || typeof priceRange !== 'string') {
            throw 'The parameters "name, location, phoneNumber, website, priceRange" must of String type';
        } else if ((name.trim()).length === 0 || (location.trim()).length === 0 || (phoneNumber.trim()).length === 0 || (website.trim()).length === 0 || (priceRange.trim()).length === 0) {
            throw 'Empty parameters not allowed';
        } else if (!phoneFormat.test(phoneNumber.trim())) {
            throw 'Phone Number must follow the "xxx-xxx-xxxx" format';
        } else if (!validateWebsite.test(website.trim())) {
            throw 'Invalid URL';
        } else if (priceRange.length < 1 || priceRange.length > 4) {
            throw 'Price must range between "$" and "$$$$"';
        } else if (priceRange !== '$' && priceRange !== '$$' && priceRange !== '$$$' && priceRange !== '$$$$') {
            throw 'Price Range must be between "$ - $$$$"';
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
            overallRating: 0,
            serviceOptions: serviceOptions,
            reviews: []
        }

        const insertInfo = await restaurantCollection.insertOne(newRestaurant);
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
        restaurantList = await restaurantCollection.find({}, { projection: { _id: 1, name: 1 } }).toArray();
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
        return { "restaurantId": id, "deleted": true };
    },

    async update(id, name, location, phoneNumber, website, priceRange, cuisines, serviceOptions) {
        let phoneFormat = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/;
        let validateWebsite = /^(http(s?):\/\/www\.)(.){5,}(\.com)$/i;
        if (typeof id !== 'string' || typeof name !== 'string' || typeof location !== 'string' || typeof phoneNumber !== 'string' || typeof website !== 'string' || typeof priceRange !== 'string') {
            throw 'The parameters "id, name, location, phoneNumber, website, priceRange" must of String type';
        } else if (!ObjectId.isValid(id.trim())) {
            throw 'Invalid ObjectID'
        } else if ((id.trim()).length === 0 || (name.trim()).length === 0 || (location.trim()).length === 0 || (phoneNumber.trim()).length === 0 || (website.trim()).length === 0 || (priceRange.trim()).length === 0) {
            throw 'The parameters "name, location, phoneNumber, website, priceRange" cannot be empty';
        } else if (!phoneFormat.test(phoneNumber.trim())) {
            throw 'Phone Number must follow the "xxx-xxx-xxxx" format';
        } else if (!validateWebsite.test(website.trim())) {
            throw 'Invalid URL';
        } else if (priceRange.length < 1 || priceRange.length > 4) {
            throw 'Price must range between "$" and "$$$$"';
        } else if (priceRange !== '$' && priceRange !== '$$' && priceRange !== '$$$' && priceRange !== '$$$$') {
            throw 'Price Range must be between "$ - $$$$"';
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

        let parseId = ObjectId(id);
        const restaurantCollection = await restaurants();
        const restaurant = await restaurantCollection.findOne({ _id: parseId });
        if (restaurant === null) throw 'Restaurant not found';

        const updateRest = {
            name: name,
            location: location,
            phoneNumber: phoneNumber,
            website: website,
            priceRange: priceRange,
            cuisines: cuisines,
            overallRating: restaurant.overallRating,
            serviceOptions: serviceOptions,
            reviews: restaurant.reviews
        };

        const updatedRestaurant = await restaurantCollection.updateOne(
            { _id: parseId }, { $set: updateRest }
        );
        if (updatedRestaurant.modifiedCount === 0) {
            throw 'Either the restaurant does not exist or all the values are same as previous values';
        }
        let renamedObject = await this.get(id);
        console.log(renamedObject);
        return renamedObject;
    }
}