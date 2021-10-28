const connection = require('./connection');

const collectionName = 'users';

const insertUser = (name, email, password, role = 'user') => (
  connection()
    .then((db) => db.collection(collectionName).insertOne({ name, email, password, role }))
    .then((data) => ({ _id: data.insertedId, name, email, role }))
);

const findByEmail = async (email) => (
  connection()
    .then((db) => db.collection(collectionName).findOne({ email }))
);

const findByName = async (name) => (
  connection()
    .then((db) => db.collection(collectionName).findOne({ name }))
);

const login = async (email, password) => (
  connection()
    .then((db) => db.collection(collectionName).findOne({ email, password }))
);

module.exports = {
  insertUser,
  findByEmail,
  findByName,
  login,
};

// const testing = async () => {
//     const result = await login('trismegisto@hermes.tudovibra');
  
//     console.log(result);
// };
//   testing();