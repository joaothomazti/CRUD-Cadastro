const registerModel = require('../models/registerModel');
const middlewares = require('../middlewares/validationMiddlewares')


const getAllUsers = async (req, res) => {
    try{
        const getAllUsers = await registerModel.getAllUsers(req.body)       
        if(getAllUsers.length === 0) {
            return res.status(200).json({error: 'Nao existe usuarios cadastrados'})
        }
        return res.status(200).json(getAllUsers)
    } catch(err) {
        return res.stauts(500).json({error: 'Erro interno do servidor' + err.message})
    }
        
}

const registerUser = async (req, res) => {
    try{     
            const registerUser = await registerModel.registerUser(req.body);
            return res.status(201).json(registerUser)
            
    }catch(err) {
        return res.status(500).json({error: 'Erro interno do servidor' + err.message})
    }
    
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params

        const user = await registerModel.deleteUser(id)

        if(!user){
            return res.status(400).json({error: 'Não foi possivel encontrar o id informado'})
        }
        return res.status(200).json({message: 'Usuario deletado com sucesso'});

    } catch (err) {
        return res.status(500).json({error: 'Erro interno do servidor ' + err.message})
    }
    
}

const alterUser = async (req, res) => {
    try{
        const {id} = req.params
        const {username} = req.body
    
        const updatedUser = await registerModel.alterUser(id, username)
    
        if(!updatedUser){
            return res.status(400).json({error: 'Não foi possivel encontrar o id informado'})
        }
        return res.status(200).json({ username: updatedUser });
    }catch(err) {
        return res.status(500).json({error: 'Erro interno do servidor ' + err.message})
    }
   
}




module.exports = {
    registerUser,
    getAllUsers,
    deleteUser,
    alterUser
}