const Joi = require('joi');
const jwt = require('jsonwebtoken');
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

const login = rescue(async (req, res, next) => {
  const { email, password } = req.body;
  const secret = 'admin1234';
  const jwtConfig = {
    expiresIn: '3d',
    algorithm: 'HS256',
  };

  if (!email || !password) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }

  const { error } = await UsersService.login(email, password);

  if (error) return next(error);

  const token = jwt.sign({ user: { email, password } }, secret, jwtConfig);

  res.status(200).json({ token });
});

module.exports = {
  insertUser,
  login,
};
