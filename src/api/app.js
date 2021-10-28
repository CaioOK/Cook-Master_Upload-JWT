const express = require('express');
const bodyParser = require('body-parser');
const UsersController = require('../controllers/Users');
const errorMiddleware = require('../middlewares/error');

const app = express();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(bodyParser.json());

app.post('/users', UsersController.insertUser);

app.use(errorMiddleware);

module.exports = app;
