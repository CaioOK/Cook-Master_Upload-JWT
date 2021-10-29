module.exports = async (err, _req, res, _next) => {
  if (err.isJoi) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  switch (err.message) {
    case 'Email already registered':
      return res.status(409).json(err);

    case 'Incorrect username or password':
      return res.status(401).json(err);

    case 'recipe not found':
      return res.status(404).json(err);

    default: return res.status(404).json({ message: 'Deu ruim' });
  }
};
