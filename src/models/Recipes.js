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

const findById = (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection(collectionName).findOne({ _id: new ObjectId(id) }));
};

const updateRecipe = (recipeId, name, ingredients, preparation) => (
  connection()
    .then((db) => db.collection(collectionName)
    .updateOne({ _id: new ObjectId(recipeId) }, { $set: { name, ingredients, preparation } }))
);

module.exports = {
  insertRecipe,
  getAll,
  findById,
  updateRecipe,
};

// const testing = async () => {
//   const result = await updateRecipe(
//     '617c1e2e750dd34c80c6a746', 'Ovo frit na mantega', 'Ovo', 'Poi em mantega quent',
//   );

//   console.log(result);
// };

// testing();