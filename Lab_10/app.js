const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');
const session = require('express-session');
// let counter = 0;

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true
}));

app.use(async (req, res, next) => {
    let date = new Date().toUTCString();
    let isUserAuthenticated = "(Non-Authenticated User)";
    if (req.session.user) {
        isUserAuthenticated = "(Authenticated User)";
    }
    console.log(`[${date}]: `, req.method, req.originalUrl, isUserAuthenticated);
    next();
});

app.use('/private', (req, res, next) => {
    if (!req.session.user) {
        res.status(403).render('users/private', { title: 'Forbidden', hasErrors: true, error: 'User should be logged in to access this page' });
    } else {
        next();
    }
});

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});