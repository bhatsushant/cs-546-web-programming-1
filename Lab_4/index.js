const restaurants = require('./data/restaurants');
const connection = require('./config/mongoConnection');

const main = async () => {
    let safrronLounge;
    let popTates;
    let renamedSaffronLounge;

    // 1. Create a new restaurant
    console.log('---------- 1 & 2. ----------');

    try {
        safrronLounge = await restaurants.create("The Saffron Lounge", "New York City, New York", "123-456-7890", "http://www.saffronlounge.com", "$$$$", ["Mexican", "Italian"], 3, { dineIn: true, takeOut: true, delivery: false });
        console.log(safrronLounge); // 2. Log 1st restaurant
    } catch (e) {
        console.log(e);
    }

    // 3. Create 2nd restaurant

    try {
        popTates = await restaurants.create("Pop Tates", "New York City, New York", "123-456-7891", "http://www.poptates.com", "$$$$", ["Mexican", "Italian"], 3.5, { dineIn: true, takeOut: true, delivery: false });
    } catch (e) {
        console.log(e);
    }

    // 4. Query all restaurants and log them all
    console.log('---------- 4. ----------');

    try {
        const allResturants = await restaurants.getAll();
        console.log(allResturants);
    } catch (e) {
        console.log(e);
    }

    // 5. Create 3rd restaurant

    console.log('---------- 5 & 6. ----------');

    try {
        const artichoke = await restaurants.create("Artichoke", "Hoboken, New Jersey", "123-456-7894", "http://www.artichoke.com", "$$$$", ["Mexican", "Italian"], 4, { dineIn: false, takeOut: true, delivery: true });
        console.log(artichoke); // 6. Log 3rd restaurant
    } catch (e) {
        console.log(e);
    }

    // 7. Rename 1st restaurant website
    console.log('---------- 7 & 8. ----------');

    try {
        const allResturants = await restaurants.getAll();
        if (allResturants.length > 0) {
            renamedSaffronLounge = await restaurants.rename(allResturants[0]._id, "http://www.thesaffronlounge.com");
            console.log(renamedSaffronLounge); // 8. Log 1st restaurant with updated website
        }
    } catch (e) {
        console.log(e);
    }

    // 9. Remove 2nd restaurant

    try {
        const removeRestaurant = await restaurants.remove(popTates._id);
    } catch (e) {
        console.log(e);
    }

    // 10. Query all restaurants and log them all
    console.log('---------- 10. ----------');

    try {
        const allResturants = await restaurants.getAll();
        console.log(allResturants);
    } catch (e) {
        console.log(e);
    }

    // 11. Create a restaurant with bad input params
    console.log('---------- 11. ----------');

    try {
        const safrronLounge = await restaurants.create("The Saffron Lounge", "New York City, New York", "$$$-$$$-$$$$", "http://www.saffronlounge.com", "$$$$", ["Cuban", "Italian"], 3, { dineIn: true, takeOut: true, delivery: false });
    } catch (e) {
        console.log(e);
    }

    // 12. Remove a restaurant that does not exist
    console.log('---------- 12. ----------');

    try {
        const removeRestaurant = await restaurants.remove('6161616161616161ffffffff');
    } catch (e) {
        console.log(e);
    }

    // 13. Rename a restaurant that does not exist
    console.log('---------- 13. ----------');

    try {
        const renamedSaffronLounge = await restaurants.rename('6161616161616161ffffffff', "http://www.test.com");
    } catch (e) {
        console.log(e);
    }

    // 14. Rename a restaurant with bad input params
    console.log('---------- 14. ----------');

    try {
        const renamedSaffronLounge = await restaurants.rename('test', 123);
        console.log(renamedSaffronLounge);
    } catch (e) {
        console.log(e);
    }

    // 15. Get restaurant that does not exist
    console.log('---------- 15. ----------');

    try {
        const restaurant = await restaurants.get("6161616161616161ffffffff");
        console.log(restaurant);
    } catch (e) {
        console.log(e);
    }

    // Close Database Connection

    const db = await connection.connectToDb();
    await connection.closeConnection();
}

main().catch((error) => {
    console.log(error);
});