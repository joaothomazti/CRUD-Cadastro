const User = require('./users')
const {Op} = require('sequelize')


const getAllUsers = async () =>  {
    try {
        const users = await User.findAll()
        return users
    } catch(err) {
        return {error: 'Erro ao buscar usuarios: ' + err.message}
    }
    
};

const registerUser = async (userData) => {
    try {
        const {username, email, password} = userData
        const existUserAndEmail = await User.findOne({
            where: {
            [Op.or]: [{username}, {email}]
            }
        })

        if(existUserAndEmail) {
            throw new Error('Usuario ou email existente')
        }

        
        const newUser = await User.create({username, email, password});
        return newUser
        
    } catch(err) {
        return { error: 'Erro ao registrar: ' + err.message }
    }
};

const deleteUser = async (id) => {
    try {
        const user = await User.destroy({
            where: {id : id}
        })
    
        return user
    } catch (err) {
        return {error: 'Erro ao deletar: ' + err.message}
    }
}

const alterUser = async (id, username) => {

    try {   
         await User.update({
            username: username, 
        },
        {
            where: {id : id},
            // returning: true
        })

        const updatedUser = await User.findOne({where: {id: id}})

        if(!updatedUser){
            return null
        }
        return updatedUser.username
        
    } catch(err) {
        return {error: 'Erro ao alterar: ' + err.message}
    }
}


module.exports = {
    registerUser,
    getAllUsers,
    deleteUser,
    alterUser
};