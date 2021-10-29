const connection = require('./connection');

const collectionName = 'recipes';

const insertRecipe = ({ name, ingredients, preparation }, userId) => (
  connection()
    .then((db) => db.collection(collectionName)
    .insertOne({ name, ingredients, preparation, userId }))
    .then((data) => ({ _id: data.insertedId, name, ingredients, preparation, userId }))
);

module.exports = {
  insertRecipe,
};
