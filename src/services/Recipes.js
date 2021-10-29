const RecipesModel = require('../models/Recipes');

const insertRecipe = async ({ name, ingredients, preparation }, userId) => {
  const newRecipe = await RecipesModel.insertRecipe({ name, ingredients, preparation }, userId);

  return newRecipe;
};

const getAll = async () => {
  const recipes = await RecipesModel.getAll();

  return recipes;
};

module.exports = {
  insertRecipe,
  getAll,
};
