const User = require('./users')



const getAllUsers = async () =>  {
    const users = await User.findAll()
    return users
};

const getUserId = async (id) => {
    const user = await User.findOne({
        where: {id : id}
    })
    return user
}

const registerUser = async (userData) => {
        const {username, email, password} = userData
        const newUser = await User.create({username, email, password});
        return newUser
};

const deleteUser = async (id) => {
    
        const delUser = await User.destroy({
            where: {id : id}
        })
        return delUser
}

const alterUser = async (id, username) => {
 
         await User.update({
            username: username, 
        },
        {
            where: {id : id},
            
        })
        const updatedUser = await User.findOne({where: {id: id}})
        return updatedUser.username
}


module.exports = {
    registerUser,
    getAllUsers,
    deleteUser,
    alterUser,
    getUserId
};