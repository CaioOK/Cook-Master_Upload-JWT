const { ObjectId } = require('mongodb');
const connection = require('./connection');

const collectionName = 'users';

const insertUser = (name, email, password, role = 'user') => (
  connection()
    .then((db) => db.collection(collectionName).insertOne({ name, email, password, role }))
    .then((data) => ({ _id: data.insertedId, name, email, role }))
);

const findByEmail = (email) => (
  connection()
    .then((db) => db.collection(collectionName).findOne({ email }))
);

const findByName = (name) => (
  connection()
    .then((db) => db.collection(collectionName).findOne({ name }))
);

const findById = (id) => {
  if (!ObjectId.isValid(id)) return null;
  
  return connection()
  .then((db) => db.collection(collectionName).findOne({ _id: new ObjectId(id) }));
}; 

const login = (email, password) => (
  connection()
    .then((db) => db.collection(collectionName).findOne({ email, password }))
);

module.exports = {
  insertUser,
  findByEmail,
  findByName,
  findById,
  login,
};

// const testing = async () => {
//     const result = await findByEmail('erickjacquin@gmail.com');
  
//     console.log(result);
// };

// testing();