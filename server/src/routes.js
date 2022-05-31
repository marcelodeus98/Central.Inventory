const { Router } = require('express');

const routes = Router();
const UseController = require('./controllers/createEquipment');

routes.post('/registerProduct', UseController.create_Equipment);
routes.post('/inputProduct/', UseController.input_Equipment);
routes.post('/outputProduct', UseController.output_Equipment);
routes.get('/loadProduct', UseController.load_Equipment);
routes.get('/loadProductBuy', UseController.load_EquipmentBuy);
routes.delete('/deleteProduct/:id_equipment', UseController.delete_Equipment);


module.exports = routes;