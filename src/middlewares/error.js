module.exports = async (err, _req, res, _next) => {
  if (err.isJoi) {
    const error = {
        message: 'Invalid entries. Try again.',
    };

    return res.status(400).json(error);
  }

  if (err.message === 'Email already registered') {
    return res.status(409).json(err);
  }

  return res.status(400).json({ err, att: 'deu ruim!' });
};
