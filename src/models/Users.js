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

module.exports = {
  insertUser,
  findByEmail,
};

// const testing = async () => {
//     const result = await findByEmail('trismegisto@hermes.tudovibra');
  
//     console.log(result);
// };
//   testing();