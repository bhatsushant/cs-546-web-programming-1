const userCollection = require('../config/mongoCollections');
const users = userCollection.users;
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const saltRounds = 16;
let userNameFormat = /^[a-zA-Z0-9]*$/gi;
let passwordFormat = /^\S*$/;

// const capitalize = (str) => {
//     const lower = str.trim().toLowerCase();
//     return str.charAt(0).toUpperCase() + lower.slice(1);
// }

module.exports = {

    async createUser(username, password) {
        let inserted = { userInserted: true };
        if (!username || username.trim() === "") {
            throw { statusCode: 400, error: 'Username cannot be empty' };
        } else if (!password || password.trim() === "") {
            throw { statusCode: 400, error: 'Password cannot be empty' };
        } else if (!passwordFormat.test(password)) {
            throw { statusCode: 400, error: 'Password cannot contain spaces' };
        } else if (username.trim().length < 4) {
            throw { statusCode: 400, error: 'Username cannot be less than 4 characters' };
        } else if (password.trim().length < 6) {
            throw { statusCode: 400, error: 'Password cannot be less than 6 characters' };
        }

        let userNameFormat = /^[a-zA-Z0-9]*$/gi;

        let inputUser = username.trim().toLowerCase();

        if (!userNameFormat.test(inputUser)) {
            // console.log("createUser", username);
            throw { statusCode: 400, error: 'Only aphanumeric characters are allowed for username' };
        }

        username = username.trim().toLowerCase();

        const hashedPass = await bcrypt.hash(password, saltRounds);

        let newUser = {
            username: username,
            password: hashedPass
        }

        // console.log('newUser', newUser);

        const userCol = await users();

        const user = await userCol.findOne({ username: username });
        // console.log('user', user);
        if (user !== null) throw { statusCode: 400, error: "User already exists. Please create an account with a different username" };

        // const user = await this.checkUser(username, password);
        // console.log('authenticated', (await user).authenticated);
        // if ((await user).authenticated) {
        //     throw { statusCode: 400, error: "User already exists. Please create an account with a different username" };
        // }

        const insertInfo = await userCol.insertOne(newUser);

        // console.log('insertInfo', insertInfo.insertedCount);

        if (insertInfo.insertedCount === 0) {
            inserted.userInserted = false;
            throw { statusCode: 500, error: 'Could not add user' };
        } else {
            return inserted;
        }
    },

    async checkUser(username, password) {
        let authenticated = { authenticated: true };
        if (!username || username.trim() === "") {
            throw { statusCode: 400, error: 'Username cannot be empty' };
        } else if (!password || password.trim() === "") {
            throw { statusCode: 400, error: 'Password cannot be empty' };
        } else if (!passwordFormat.test(password)) {
            throw { statusCode: 400, error: 'Password cannot contain spaces' };
        } else if (username.trim().length < 4) {
            throw { statusCode: 400, error: 'Username cannot be less than 4 characters' };
        } else if (password.trim().length < 6) {
            throw { statusCode: 400, error: 'Password cannot be less than 6 characters' };
        }

        let userNameFormat = /^[a-zA-Z0-9]*$/gi;

        let inputSignupUser = username.trim().toLowerCase();

        if (!userNameFormat.test(inputSignupUser)) {
            // console.log("checkUser", username);
            throw { statusCode: 400, error: 'Only aphanumeric characters are allowed for username' };
        }

        username = username.trim().toLowerCase();
        // console.log('username', username);
        const userCol = await users();
        // console.log('userCol', userCol.findOne);
        const user = await userCol.findOne({ username: username });
        // console.log('user', user);
        if (user === null) throw { statusCode: 400, error: 'Either the username or password is invalid' };

        // console.log('user', user);

        let compToHash = false;

        compToHash = await bcrypt.compare(password, user.password);

        // console.log('compToHash', compToHash);

        if (compToHash) {
            return authenticated;
        } else {
            authenticated.authenticated = false;
            throw { statusCode: 400, error: 'Either the username or password is invalid' };
        }
    },
}