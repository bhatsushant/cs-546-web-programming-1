const MongoClient = require('mongodb').MongoClient;
const settings = {
    mongoConfig: {
        serverUrl: 'mongodb://localhost:27017',
        database: 'Sushant_Bhat_Lab6'
    }
};

const mongoConfig = settings.mongoConfig;

let _connection = undefined;
let _db = undefined;

module.exports = {
    connectToDb: async () => {
        if (!_connection) {
            _connection = await MongoClient.connect(mongoConfig.serverUrl);
            _db = await _connection.db(mongoConfig.database);
        }
        return _db;
    },
    closeConnection: () => {
        _connection.close();
    }
};