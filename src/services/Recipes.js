const RecipesModel = require('../models/Recipes');

const insertRecipe = async ({ name, ingredients, preparation }, userId) => {
  const newRecipe = await RecipesModel.insertRecipe({ name, ingredients, preparation }, userId);

  return newRecipe;
};

const insertImage = async (recipeId, imageUrl, userId, role) => {
  const recipe = await RecipesModel.findById(recipeId);

  if (!recipe) {
    return {
      error: {
        message: 'recipe not found',
      },
    };
  }
  
  if (role !== 'admin' && JSON.stringify(userId) !== JSON.stringify(recipe.userId)) {
    return {
      error: {
        message: 'You do not have authorization to update this recipe',
      },
    };
  }

  await RecipesModel.insertImage(recipeId, imageUrl);

  return { ...recipe, image: imageUrl };
};

const getAll = async () => {
  const recipes = await RecipesModel.getAll();

  return recipes;
};

const findById = async (recipeId) => {
  const recipe = await RecipesModel.findById(recipeId);

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

  if (role !== 'admin' && JSON.stringify(userId) !== JSON.stringify(recipe.userId)) {
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

const deleteRecipe = async (recipeId, userId, role) => {
  const recipe = await RecipesModel.findById(recipeId);

  if (role !== 'admin' && JSON.stringify(userId) !== JSON.stringify(recipe.userId)) {
    return {
      error: {
        message: 'You do not have authorization to delete this recipe',
      },
    };
  }

  await RecipesModel.deleteRecipe(recipeId);

  return true;
};

module.exports = {
  insertRecipe,
  getAll,
  findById,
  updateRecipe,
  deleteRecipe,
  insertImage,
};
