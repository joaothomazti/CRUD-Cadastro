const {z} = require('zod')
const User = require("../models/users");
const { Op } = require("sequelize");

const registerSchema = z.object({
    username: z.string().min(2).max(10),
    email: z.string().email(),
    password: z.string().min(6)
}) 

const validationUserAndEmail = async (req, res, next) => {
    const {username, email} = registerSchema.parse(req.body)

    try{
        const existUserAndEmail = await User.findOne({
            where: {
            [Op.or]: [{username}, {email}]
            }
        })
        if(existUserAndEmail) {
            throw new Error('User and Email exists')
        }
        next()
    } catch(err){
        return res.status(400).json({error: err.message})
    }
    
}

const registerValidationSchema = (req, res, next) => {

    try{
        registerSchema.parse(req.body)
        next()
    }catch (err) {
        const errorMesssage = JSON.parse(err.message)[0].message
        return res.status(400).json({error: errorMesssage})
    }
    
}

const existId = async (req, res, next) => {

    const {id} = req.params

    try{
        const existId = await User.findOne({
            where: {id : id}
        })
        
        if(!existId){
            return res.status(400).json({error: 'Could not find the id entered'})
        }
        next()
    }catch(err){
        return res.status(400).json({error: err.message})
    }
    
}


module.exports ={
    registerValidationSchema,
    validationUserAndEmail,
    existId
} 


