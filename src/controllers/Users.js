const Joi = require('joi');
const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const UsersService = require('../services/Users');

const insertUser = rescue(async (req, res, next) => {
  const { name, email, password } = req.body;

  const { error } = Joi.object({
    name: Joi.string().not().empty().required(),
    email: Joi.string().email().required(),
    password: Joi.string().not().empty().required(),
  }).validate(req.body);

  if (error) return next(error);

  const user = await UsersService.insertUser(name, email, password);

  if (user.error) return next(user.error);
  res.status(201).json({ user });
});

const insertAdmin = rescue(async (req, res, next) => {
  const { role } = req.user;
  const { name, email, password } = req.body;

  if (role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can register new admins' });
  }

  const { error } = Joi.object({
    name: Joi.string().not().empty().required(),
    email: Joi.string().not().empty().required(),
    password: Joi.string().not().empty().required(),
  }).validate(req.body);

  if (error) return next(error);

  const user = await UsersService.insertAdmin(name, email, password, role);

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

  const { error, role } = await UsersService.login(email, password);

  if (error) return next(error);

  const token = jwt.sign({ email, role }, secret, jwtConfig);

  res.status(200).json({ token });
});

module.exports = {
  insertUser,
  login,
  insertAdmin,
};
