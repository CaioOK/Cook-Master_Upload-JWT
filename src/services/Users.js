const UsersModel = require('../models/Users');

const insertUser = async (name, email, password) => {
  const alreadyExists = await UsersModel.findByEmail(email);

  if (alreadyExists) {
    return {
      error: {
        message: 'Email already registered',
      },
    };
  }
  
  return UsersModel.insertUser(name, email, password);
};

module.exports = {
  insertUser,
};
