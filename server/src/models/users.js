const Sequelize = require('sequelize')
const db = require('./db')

const User = db.define('users',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false, // not defind false
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    user: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
},
{
    timestamps: false // creat_at, update_at
});


//Criar a tabela
//User.sync();
//Verificar se há alguma diferença na tabela, realiza a alteração
//User.sync({alter: true, force:true});


module.exports = User;