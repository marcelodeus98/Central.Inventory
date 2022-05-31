const Sequelize = require('sequelize')
const db = require('./db')


const Equipment = db.define('equipments',{
    id_equipment:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false, // not defind false
        primaryKey: true
    },
    name_equipment: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    quant_equipment: {
        type: Sequelize.INTEGER,
    }
},
{
    timestamps: true // creat_at, update_at
});

//Criar a tabela
Equipment.sync();
//Verificar se há alguma diferença na tabela, realiza a alteração
//Equipment.sync({ alter: true , force:true});

module.exports = Equipment;