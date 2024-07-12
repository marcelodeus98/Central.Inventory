const { Op } = require('sequelize');
const {object, string, number} = require ('yup');
const Equipment = require ('../models/equipment');
  
module.exports = {
  async createEquipment(req, res) {
    const schema = object().shape({
      nameEquipment: string().required(),
    });
  
    if(!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' })
    }
  
    try{
      const existingEquipment = await Equipment.findOne({
        where:{
          nameEquipment: req.body.nameEquipment
        }
      });
      
      if (existingEquipment) {
        return res.status(409).json({ error: 'Equipment already exists.' });
      }

      const {nameEquipment} = await Equipment.create(req.body)
      return res.json({
         nameEquipment,
        });
    } catch(error){
      return res.status(500).json({ error: 'Internal server error.' });
    }
  },

  async loadEquipment (req, res) {
    const equipment = await Equipment.findAll();

    return res.json(equipment);
  },

  async loadEquipmentBuy (req, res) { 
    const equipment = await Equipment.findAll(
      { where:{ 
        quantEquipment:{ 
          [Op.lte]: 3 
        } 
      } 
      });
    return res.json(equipment) 
  },
    
  async updateEquipment (req, res) {
    const schema = object().shape({
      idEquipment: number().required(),
      nameEquipment: string().required()
    });

    if(!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const {idEquipment, nameEquipment} = req.body;

    const equipment = await Equipment.findByPk(idEquipment);

    if (!equipment) {
      return res.status(401).json({ error: 'Equipment not update' });
    }

    equipment.nameEquipment = nameEquipment;

    const nameSave = await equipment.save();

    return res.status(200).json({msg: 'Equipment update!.'})
  },
  
  async inputEquipment (req, res) {
    const schema = object().shape({
      idEquipment: number().required(),
      quantEquipment: number().required(),
    });
  
    if(!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' })
    }
    
    const {idEquipment, quantEquipment} = req.body;

    const equipment = await Equipment.findByPk(idEquipment);

       if (!equipment) {
         return res.status(401).json({ error: 'Equipment not update' });
       }
     
      const updateEquipment = equipment.quantEquipment; 

      equipment.quantEquipment = quantEquipment + updateEquipment  ;
   
       const quantSave = await equipment.save();
      
       return res.status(200).json({msg: 'Equipment update!.'})

    },

    async outputEquipment (req, res) {
      const schema = object().shape({
        idEquipment: number().required(),
        quantEquipment: number().required(),
      });
    
      if(!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails.' })
      }
  
      const {idEquipment, quantEquipment} = req.body;
      const equipment = await Equipment.findByPk(idEquipment);
  
      if (!equipment) {
           return res.status(401).json({ error: 'Equipment not update' });
         }
      
        const updateEquipment = equipment.quantEquipment; 
        const output = quantEquipment - updateEquipment; 
  
        equipment.quantEquipment =  output*-1;
      
         const quantSave = await equipment.save();
        
         return res.status(200).json({msg: 'Equipment update!.'})  
      },

      async deleteEquipment (req, res) {
        
        const {idEquipment} = req.params;
      
        Equipment.destroy({where: {idEquipment}});
          
        return res.status(200).json({msg: 'Equipment deleted!'});  
      }, 
}