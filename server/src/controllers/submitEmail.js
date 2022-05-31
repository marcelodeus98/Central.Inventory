const nodemailer = require('nodemailer');
const Equipment = require ('../models/equipment');
const { Op } = require('sequelize');

let transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", // hostname
  secureConnection: false, // TLS requires secureConnection to be false
  port: 587, // port for secure SMTP
  tls: {
     ciphers:'SSLv3'
  },
  // Configuration my acess in email - outlook
  auth: {
      user: 'marcelodeus98@outlook.com',
      pass: '8poseidon8'
  }
});

let sendEmail = (value1, value2) => {
  transporter.sendMail({
  from:'Marcelo Deus <marcelodeus98@outlook.com>',
  to: 'ti@modacolmeia.com',
  subject: 'Produto em baixa quantidade no estoque',
  text: `O ${value1}, ${value2}, está com a quantidade baixa no estoque, sendo recomendado requisição do mesmo!`
  }).then(message => {
  console.log(message);
  }).catch(err => {
  console.log(err)
  })     
}

 async function loadEquipmentEmail () {
  console.log('on loadEquipmentEmail')  
  const equipment = await Equipment.findAll({
    where: { 
      quant_equipment:{
        [Op.lte]: 3,
      }
    }
  });
  
  equipment.map(itens => {
    itens.id_equipment,
    itens.name_equipment
    
    return sendEmail(itens.id_equipment, itens.name_equipment);
  })
 }

module.exports = {
  loadEquipmentEmail
}