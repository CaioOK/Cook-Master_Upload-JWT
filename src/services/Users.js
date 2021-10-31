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

const insertAdmin = async (name, email, password, role) => {
  const alreadyExists = await UsersModel.findByEmail(email);

  if (alreadyExists) {
    return {
      error: {
        message: 'Email already registered',
      },
    };
  }

  return UsersModel.insertUser(name, email, password, role);
};

const login = async (email, password) => {
  const user = await UsersModel.login(email, password);

  if (!user) {
    return {
      error: {
        message: 'Incorrect username or password',
      },
    };
  }

  return { email, role: user.role };
};

module.exports = {
  insertUser,
  login,
  insertAdmin,
};
