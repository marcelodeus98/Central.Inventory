const express = require('express');
const routes = require('./src/routes');
const cors = require('cors');

const sendEmail = require('./src/controllers/submitEmail');
let useSendEmail = async(req, res, next) => { await sendEmail.loadEquipmentEmail()}

console.log(useSendEmail())

const app = express();

app.use(cors())

app.use(express.json())
app.use(routes);

app.listen(3030, () => {
    console.log('Port 3030 is running!')
})