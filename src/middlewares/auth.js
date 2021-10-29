const jwt = require('jsonwebtoken');
const UsersModel = require('../models/Users');

const secret = 'admin1234';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  const error = {
    message: 'jwt malformed',
  };

  if (!token) return res.status(401).json(error);

  try {
    const userData = jwt.verify(token, secret);

    const user = await UsersModel.findByEmail(userData.email);
    console.log('user no auth: ', user);
    if (!user) {
      return res.status(401).json(error);
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
