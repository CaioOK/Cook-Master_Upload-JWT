const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const UsersController = require('../controllers/Users');
const RecipesController = require('../controllers/Recipes');
const errorMiddleware = require('../middlewares/error');
const authMiddleware = require('../middlewares/auth');

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, 'src/uploads/');
  },

  filename: (req, file, callBack) => {
    const { id } = req.params;
    const fileExtension = file.originalname.split('.')[1];
    
    callBack(null, `${id}.${fileExtension.replace('jpg', 'jpeg')}`);
  },
});

const upload = multer({ storage });

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.get('/recipes', RecipesController.getAll);

app.get('/recipes/:id', RecipesController.findById);

app.put(
  '/recipes/:id/image',
  authMiddleware,
  upload.single('image'),
  RecipesController.insertImage,
);

app.post('/recipes', authMiddleware, RecipesController.insertRecipe);

app.put('/recipes/:id', authMiddleware, RecipesController.updateRecipe);

app.post('/users', UsersController.insertUser);

app.post('/login', UsersController.login);

app.delete('/recipes/:id', authMiddleware, RecipesController.deleteRecipe);

app.use(errorMiddleware);

module.exports = app;
