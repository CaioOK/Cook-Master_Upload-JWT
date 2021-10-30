const express = require('express');
const bodyParser = require('body-parser');
const UsersController = require('../controllers/Users');
const RecipesController = require('../controllers/Recipes');
const errorMiddleware = require('../middlewares/error');
const authMiddleware = require('../middlewares/auth');

const app = express();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(bodyParser.json());

app.get('/recipes', RecipesController.getAll);

app.get('/recipes/:id', RecipesController.findById);

app.post('/recipes', authMiddleware, RecipesController.insertRecipe);

app.put('/recipes/:id', authMiddleware, RecipesController.updateRecipe);

app.post('/users', UsersController.insertUser);

app.post('/login', UsersController.login);

app.delete('/recipes/:id', authMiddleware, RecipesController.deleteRecipe);

app.use(errorMiddleware);

module.exports = app;
