const registerModel = require('../models/registerModel');


const getAllUsers = async (req, res) => {
    try{
        const getAllUsers = await registerModel.getAllUsers(req.body)       
        if(getAllUsers.length === 0) {
            return res.status(200).json({error: 'There are no registered users'})
        }
        return res.status(200).json(getAllUsers)
    } catch(error) {
        throw error
    }
        
}

const getUserId = async (req, res) => {
    const {id} = req.params
    try{
        const getUser = await registerModel.getUserId(id)
        return res.status(200).json(getUser)
    }catch(error){
        throw error
    }
}

const registerUser = async (req, res) => {
    try{     
        const registerUser = await registerModel.registerUser(req.body);

        return res.status(201).json(registerUser)
    }catch(error) {
        throw error
    }
    
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        await registerModel.deleteUser(id)

        return res.status(200).json({message: 'successfully deleted user'});
    } catch(error) {
        throw error
    }
    
}

const alterUser = async (req, res) => {
    try{
        const {id} = req.params
        const {username} = req.body
        const updatedUser = await registerModel.alterUser(id, username)

        return res.status(200).json({ username: updatedUser });
    }catch(error) {
        throw error
    }
   
}




module.exports = {
    registerUser,
    getAllUsers,
    deleteUser,
    alterUser,
    getUserId
}