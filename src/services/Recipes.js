const RecipesModel = require('../models/Recipes');

const insertRecipe = async ({ name, ingredients, preparation }, userId) => {
  const newRecipe = await RecipesModel.insertRecipe({ name, ingredients, preparation }, userId);

  return newRecipe;
};

const getAll = async () => {
  const recipes = await RecipesModel.getAll();

  return recipes;
};

const findById = async (id) => {
  const recipe = await RecipesModel.findById(id);

  if (!recipe) {
    return {
      error: {
        message: 'recipe not found',
      },
    };
  }

  return recipe;
};

module.exports = {
  insertRecipe,
  getAll,
  findById,
};
