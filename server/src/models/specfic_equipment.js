const Sequelize = require('sequelize')
const db = require('./db')

const SpecifcEquipment = db.define('specific_equipments',{
    idEquipment:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false, // not defind false
        primaryKey: true
    },
    nameEquipment: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    model: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    numberSerial: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    state:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    isUpdate:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    note:{
        type: Sequelize.STRING,
        allowNull: false,
    },
},
{
    timestamps: true // creat_at, update_at
});

//Criar a tabela
//SpecifcEquipment.sync();
//Verificar se há alguma diferença na tabela, realiza a alteração
//SpecifcEquipment.sync({alter: true, force:true});

module.exports = SpecifcEquipment;
