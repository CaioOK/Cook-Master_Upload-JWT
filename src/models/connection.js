const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_DB_URL = `mongodb://${process.env.HOST || 'mongodb'}:27017/Cookmaster`;
const DB_NAME = 'Cookmaster';

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let dataBase = null;

const connection = async () => (
  dataBase ? Promise.resolve(dataBase) : MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => {
      dataBase = conn.db(DB_NAME);
      return dataBase;
    })
);

module.exports = connection;
