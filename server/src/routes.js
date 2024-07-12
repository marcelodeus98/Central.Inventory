const { Router } = require('express');
const routes = Router();

const UseControllerProduct = require('./controllers/configEquipment');
const UseControllerEquipment = require('./controllers/configSpecificEquipment');
const UseControllerUser = require('./controllers/configUser');
const sessionController = require('./controllers/configSession');

//Rotas públicas
routes.post('/login', sessionController.login);

//Rotas protegidas
routes.get('/users/',UseControllerUser.loadUsers);
routes.get('/products/', UseControllerProduct.loadEquipment);
routes.get('/equipments/', UseControllerEquipment.loadEquipment);
routes.get('/productsBuy/', UseControllerProduct.loadEquipmentBuy);


routes.post('/user/register/', UseControllerUser.createUser);
routes.post('/product/register/', UseControllerProduct.createEquipment);
routes.post('/equipment/register/', UseControllerEquipment.createEquipment);
routes.post('/product/input/', UseControllerProduct.inputEquipment);
routes.post('/product/output/', UseControllerProduct.outputEquipment);

routes.put('/product/update/', UseControllerProduct.updateEquipment);
routes.put('/equipment/update/', UseControllerEquipment.updateEquipment);

routes.delete('/user/delete/:id/', UseControllerUser.deleteUser);
routes.delete('/product/delete/:idEquipment/', UseControllerProduct.deleteEquipment);
routes.delete('/equipment/delete/:idEquipment/', UseControllerEquipment.deleteEquipment);

module.exports = routes;