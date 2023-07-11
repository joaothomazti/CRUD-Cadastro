const registerModel = require('../models/registerModel');
const {registerValidation} = require('../middlewares/validationMiddlewares')


const registerUser = async (req, res) => {
    try{
        registerValidation(req, res, async () => {
            const registerUser = await registerModel.registerUser(req.body);
            return res.status(201).json(registerUser)
        })
    }catch(err) {
        return res.status(500).json({error: 'Erro interno do servidor'})
    }
    
}




module.exports = {
    registerUser
}