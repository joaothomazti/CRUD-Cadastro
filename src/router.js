const express = require('express'); 

const router = express.Router();
const registerController = require('./controllers/registerController');
const middlewares = require('./middlewares/validationMiddlewares')



//Busca Todos Usuarios cadastrados
router.get('/register', registerController.getAllUsers)

//Busca um usuario pelo ID
router.get('/register/:id', middlewares.existId, registerController.getUserId)

//Criar novo usuario
router.post('/register',  middlewares.registerValidationSchema, middlewares.validationUserAndEmail, registerController.registerUser);

//Deleta um usuario

router.delete('/register/:id', middlewares.existId, registerController.deleteUser)

//Alterar um dado do usuario
router.put('/register/:id',  middlewares.existId, registerController.alterUser)




module.exports = router;