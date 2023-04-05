const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const user = require('../data/users');
const { capitalize } = require('../data/users');
let userNameFormat = /^[a-zA-Z0-9]*$/gi;
let passwordFormat = /^\S*$/;

router.get('/', async (req, res) => {
    if (req.session.user) {
        res.redirect('/private');
    } else {
        res.render('users/login', { title: 'Login' });
    }
});

router.get('/signup', async (req, res) => {
    if (req.session.user) {
        res.redirect('/private');
    } else {
        res.render('users/signup', { title: 'Sign Up' });
    }
});

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || username.trim() === "") {
            res.status(400).render('users/signup', { hasErrors: true, error: "Username cannot be empty" });
            return;
        } else if (!password || password.trim() === "") {
            res.status(400).render('users/signup', { hasErrors: true, error: "Password cannot be empty" });
            return;
        } else if (!passwordFormat.test(password)) {
            res.status(400).render('users/signup', { hasErrors: true, error: "Password cannot contain spaces" });
            return;
        } else if (username.trim().length < 4) {
            res.status(400).render('users/signup', { hasErrors: true, error: "Username cannot be less than 4 characters" });
            return;
        } else if (password.trim().length < 6) {
            res.status(400).render('users/signup', { hasErrors: true, error: "Password cannot be less than 6 characters" });
            return;
        }

        let userNameFormat = /^[a-zA-Z0-9]*$/gi;
        let inputSignupUser = username.trim().toLowerCase();
        if (!userNameFormat.test(inputSignupUser)) {
            // console.log("signup", userNameFormat.test(inputUser));
            // console.log("signup", `"${inputUser}"`);
            res.status(400).render('users/signup', { hasErrors: true, error: "Only aphanumeric characters are allowed for username" });
            return;
        }
        const validUser = await user.createUser(username, password);
        if (validUser.userInserted) {
            res.redirect('/');
        }
    } catch (e) {
        if (e.statusCode) {
            res.status(e.statusCode).render('users/signup', { title: 'Sign Up', hasErrors: true, error: e.error });
            // return;
        } else {
            // console.log("signup catch", username);
            res.status(400).render('users/signup', { title: 'Sign Up', hasErrors: true, error: 'Either the username or password is invalid' });
            // return;
        }
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || username.trim() === "") {
            res.status(400).render('users/login', { hasErrors: true, error: "Username cannot be empty" });
            return;
        } else if (!password || password.trim() === "") {
            res.status(400).render('users/login', { hasErrors: true, error: "Password cannot be empty" });
            return;
        } else if (!passwordFormat.test(password)) {
            res.status(400).render('users/login', { hasErrors: true, error: "Password cannot contain spaces" });
            return;
        } else if (username.trim().length < 4) {
            res.status(400).render('users/login', { hasErrors: true, error: "Username cannot be less than 4 characters" });
            return;
        } else if (password.trim().length < 6) {
            res.status(400).render('users/login', { hasErrors: true, error: "Password cannot be less than 6 characters" });
            return;
        }
        let userNameFormat = /^[a-zA-Z0-9]*$/gi;
        let inputUser = username.trim().toLowerCase();
        if (!userNameFormat.test(inputUser)) {
            // console.log(userNameFormat.test(inputUser));
            // console.log(`"${inputUser}"`);
            res.status(400).render('users/login', { hasErrors: true, error: "Only aphanumeric characters are allowed for username" });
            return;
        }
        const authUser = await user.checkUser(username, password);
        if (authUser.authenticated) {
            req.session.user = { username: username.trim() };
            res.redirect('/private');
            // return;
        }
    } catch (e) {
        if (e.statusCode) {
            res.status(e.statusCode).render('users/login', { title: 'Login', hasErrors: true, error: e.error });
            return;
        } else {
            // console.log("login catch", username);
            res.status(400).render('users/login', { title: 'Login', hasErrors: true, error: 'Either the username or password is invalid' });
            return;
        }
    }
});

router.get('/private', (req, res, next) => {
    if (!req.session.user) {
        res.status(403).render('users/private', { title: 'Forbidden', hasErrors: true, error: '403 Forbidden' });
    } else {
        res.render('users/private', { title: `Hi ${req.session.user.username}` });
        // next();
    }
});

router.get('/logout', async (req, res) => {
    if (req.session.user) {
        req.session.destroy();
        res.render('users/logout', { title: 'Logout', message: "You have logged out successfully" });
    } else {
        res.render('users/logout', { title: 'Logout', hasErrors: true, error: "Please Login using the below link" });
    }
});

module.exports = router;