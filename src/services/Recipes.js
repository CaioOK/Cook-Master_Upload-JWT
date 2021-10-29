const RecipesModel = require('../models/Recipes');

const insertRecipe = async ({ name, ingredients, preparation }, userId) => {
  const newRecipe = await RecipesModel.insertRecipe({ name, ingredients, preparation }, userId);

  return newRecipe;
};

module.exports = {
  insertRecipe,
};
