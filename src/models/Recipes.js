const { ObjectId } = require('mongodb');
const connection = require('./connection');

const collectionName = 'recipes';

const insertRecipe = ({ name, ingredients, preparation }, userId) => (
  connection()
    .then((db) => db.collection(collectionName)
    .insertOne({ name, ingredients, preparation, userId }))
    .then((data) => ({ _id: data.insertedId, name, ingredients, preparation, userId }))
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
};

// const testing = async () => {
//   const result = await deleteRecipe('617c95709ff8dabe918b17a1');

//   console.log(result);
// };

// testing();