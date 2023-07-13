const User = require('./users')
const {Op} = require('sequelize')


const getAllUsers = async () =>  {
        const users = await User.findAll()
        return users
};

const registerUser = async (userData) => {

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
};

const deleteUser = async (id) => {
    
        const user = await User.destroy({
            where: {id : id}
        })
        return user
}

const alterUser = async (id, username) => {
 
         await User.update({
            username: username, 
        },
        {
            where: {id : id},
            
        })
        const updatedUser = await User.findOne({where: {id: id}})
        if(!updatedUser){
            return null
        }
        return updatedUser.username
}


module.exports = {
    registerUser,
    getAllUsers,
    deleteUser,
    alterUser
};