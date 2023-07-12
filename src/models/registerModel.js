const User = require('./users')
const {Op} = require('sequelize')


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
        if(newUser.username !== '') {
            return  newUser 
        }else {
            throw new Error('deu ruim')
        }
        
    } catch(err) {
        return { error: 'Erro ao registrar: ' + err.message }
    }
};


module.exports = {
    registerUser
};