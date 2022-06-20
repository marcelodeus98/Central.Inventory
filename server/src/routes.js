const { Router } = require('express');

const routes = Router();
const UseController = require('./controllers/configEquipment');
const UseControllerTwo = require('./controllers/userConfig');

routes.post('/registerProduct', UseController.create_Equipment);
routes.post('/updateProduct/', UseController.update_Equipment);
routes.post('/inputProduct/', UseController.input_Equipment);
routes.post('/outputProduct', UseController.output_Equipment);
routes.get('/loadProduct', UseController.load_Equipment);
routes.get('/loadProductBuy', UseController.load_EquipmentBuy);
routes.delete('/deleteProduct/:id_equipment', UseController.delete_Equipment);
routes.post('/login', UseControllerTwo.login);


module.exports = routes;