const express = require('express'); 

const router = express.Router();
const registerController = require('./controllers/registerController');



//Busca Todos Usuarios cadastrados
router.get('/register', registerController.getAllUsers)


//Criar novo usuario
router.post('/register', registerController.registerUser);

//Deleta um usuario

router.delete('/register/:id', registerController.deleteUser)


module.exports = router;