const User = require('./users')
const {Op} = require('sequelize')


const getAllUsers = async () =>  {
    try {
        const users = await User.findAll()
        return users
    } catch(err) {
        return {error: 'Erro ao buscar usuarios: ' + err.message}
    }
    
}

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


module.exports = {
    registerUser,
    getAllUsers
};