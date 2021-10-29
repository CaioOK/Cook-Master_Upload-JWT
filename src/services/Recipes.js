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

const updateRecipe = async ({ recipeId, name, ingredients, preparation }, userId, role) => {
  const recipe = await RecipesModel.findById(recipeId);

  if (role !== 'admin' && userId.toString() !== recipe.userId.toString()) {
    return {
      error: {
        message: 'You do not have authorization to update this recipe',
      },
    };
  }
  
  await RecipesModel.updateRecipe(recipeId, name, ingredients, preparation);

  const updatedRecipe = await RecipesModel.findById(recipeId);

  return updatedRecipe;
};

module.exports = {
  insertRecipe,
  getAll,
  findById,
  updateRecipe,
};
