const charRoutes = require('./characters');

const constructorMethod = app => {
    app.use('/', charRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Route Not Found' });
    });
};

module.exports = constructorMethod;