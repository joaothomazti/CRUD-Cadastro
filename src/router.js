const express = require('express'); 

const router = express.Router();
const registerController = require('./controllers/registerController');



//Rotas 
router.get('/register', (req, res) => {
    res.send('Ola')
})


//Criar um usuario
router.post('/register', registerController.registerUser);


module.exports = router;