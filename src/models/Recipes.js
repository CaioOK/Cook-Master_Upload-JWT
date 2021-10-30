const { ObjectId } = require('mongodb');
const connection = require('./connection');

const collectionName = 'recipes';

const insertRecipe = ({ name, ingredients, preparation }, userId) => (
  connection()
    .then((db) => db.collection(collectionName)
    .insertOne({ name, ingredients, preparation, userId }))
    .then((data) => ({ _id: data.insertedId, name, ingredients, preparation, userId }))
);

const insertImage = (recipeId, imageUrl) => (
  connection()
    .then((db) => db.collection(collectionName)
    .updateOne({ _id: new ObjectId(recipeId) }, { $set: { image: imageUrl } }))
);

const getAll = () => (
  connection()
    .then((db) => db.collection(collectionName).find().toArray())
);

const findById = (recipeId) => {
  if (!ObjectId.isValid(recipeId)) return null;

  return connection()
    .then((db) => db.collection(collectionName).findOne({ _id: new ObjectId(recipeId) }));
};

const updateRecipe = (recipeId, name, ingredients, preparation) => (
  connection()
    .then((db) => db.collection(collectionName)
    .updateOne({ _id: new ObjectId(recipeId) }, { $set: { name, ingredients, preparation } }))
);

const deleteRecipe = (recipeId) => (
  connection()
    .then((db) => db.collection(collectionName).deleteOne({ _id: new ObjectId(recipeId) }))
);

module.exports = {
  insertRecipe,
  getAll,
  findById,
  updateRecipe,
  deleteRecipe,
  insertImage,
};

// const testing = async () => {
//   const result = await insertImage(
//     '617dae6159e02e8bf79b9cbb',
//     'localhost:3000/src/uploads/xablau1234.jpg',
//   );

//   console.log(result);
// };

// testing();