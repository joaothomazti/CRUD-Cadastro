const { Sequelize } = require('sequelize')
require('dotenv').config();

const dbconfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}

const sequelize = new Sequelize(dbconfig.database, dbconfig.user,dbconfig.password, {
    host: dbconfig.host,
    dialect: 'mysql'
}) 

module.exports = sequelize