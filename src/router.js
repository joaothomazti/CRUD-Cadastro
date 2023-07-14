const express = require('express'); 

const router = express.Router();
const registerController = require('./controllers/registerController');
const middlewares = require('./middlewares/validationMiddlewares')



//Busca Todos Usuarios cadastrados
router.get('/register', registerController.getAllUsers)


//Criar novo usuario
router.post('/register',  middlewares.registerValidation, registerController.registerUser);

//Deleta um usuario

router.delete('/register/:id', registerController.deleteUser)

//Alterar um dado do usuario
router.put('/register/:id', registerController.alterUser)


module.exports = router;