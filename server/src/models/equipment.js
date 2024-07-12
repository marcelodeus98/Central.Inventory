const Sequelize = require('sequelize')
const db = require('./db')


const Equipment = db.define('equipments',{
    idEquipment:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false, // not defind false
        primaryKey: true
    },
    nameEquipment: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    quantEquipment: {
        type: Sequelize.INTEGER,
    },
    status: {
        type: Sequelize.INTEGER, 
        defaultValue: 0,
    }
},
{
    timestamps: true // creat_at, update_at
});

//Criar a tabela
//Equipment.sync();
//Verificar se há alguma diferença na tabela, realiza a alteração
//Equipment.sync({alter: true, force:true});


module.exports = Equipment;
