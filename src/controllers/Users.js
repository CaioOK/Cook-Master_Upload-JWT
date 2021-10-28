const Joi = require('joi');
const rescue = require('express-rescue');
const UsersService = require('../services/Users');

const insertUser = rescue(async (req, res, next) => {
  const { error } = Joi.object({
    name: Joi.string().not().empty().required(),
    email: Joi.string().email().required(),
    password: Joi.string().not().empty().required(),
  }).validate(req.body);

  if (error) return next(error);

  const { name, email, password } = req.body;

  const user = await UsersService.insertUser(name, email, password);

  if (user.error) return next(user.error);
  res.status(201).json({ user });
});

module.exports = {
  insertUser,
};
