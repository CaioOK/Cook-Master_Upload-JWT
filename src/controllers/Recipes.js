const Joi = require('joi');
const rescue = require('express-rescue');
const RecipesService = require('../services/Recipes');

const insertRecipe = rescue(async (req, res, next) => {
  const { _id } = req.user;
  const { error } = Joi.object({
    name: Joi.string().not().empty().required(),
    ingredients: Joi.string().not().empty().required(),
    preparation: Joi.string().not().empty().required(),
  }).validate(req.body);

  if (error) return next(error);

  const { name, ingredients, preparation } = req.body;

  const recipe = await RecipesService.insertRecipe({ name, ingredients, preparation }, _id);

  res.status(201).json({ recipe });
});

const getAll = rescue(async (_req, res) => {
  const recipes = await RecipesService.getAll();

  res.status(200).json(recipes);
});

const findById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const recipe = await RecipesService.findById(id);

  if (recipe.error) return next(recipe.error);

  res.status(200).json(recipe);
});

module.exports = {
  insertRecipe,
  getAll,
  findById,
};
