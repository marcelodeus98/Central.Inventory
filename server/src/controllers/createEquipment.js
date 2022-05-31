const { Op } = require('sequelize');
const {object, string, number} = require ('yup');
const Equipment = require ('../models/equipment');
  
module.exports = {
  async create_Equipment(request, response) {
    const schema = object().shape({
      name_equipment: string().required(),
    });
  
    if(!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails.' })
    }
  
    const {name_equipment} = await Equipment.create(request.body)
    return response.json({
       name_equipment,
      })
    },
  
  async input_Equipment (request, response) {
    const schema = object().shape({
      id_equipment: number().required(),
      quant_equipment: number().required(),
    });
  
    if(!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails.' })
    }
    
    const {id_equipment, quant_equipment} = request.body;

    const equipment = await Equipment.findByPk(id_equipment);

       if (!equipment) {
         return response.status(401).json({ error: 'Equipment not update' });
       }
     
      const update_equipment = equipment.quant_equipment; 
      equipment.quant_equipment = quant_equipment + update_equipment  ;
   
       const quantSave = await equipment.save();
      
       return response.status(200).json({msg: 'Equipment update!.'})

    },

    async output_Equipment (request, response) {
      const schema = object().shape({
        id_equipment: number().required(),
        quant_equipment: number().required(),
      });
    
      if(!(await schema.isValid(request.body))) {
        return response.status(400).json({ error: 'Validation fails.' })
      }
      
      const {id_equipment, quant_equipment} = request.body;
  
      const equipment = await Equipment.findByPk(id_equipment);
  
         if (!equipment) {
           return response.status(401).json({ error: 'Equipment not update' });
         }
      
        const update_equipment = equipment.quant_equipment; 
        const output = quant_equipment - update_equipment; 
        equipment.quant_equipment =  output*-1;
      
         const quantSave = await equipment.save();
        
         return response.status(200).json({msg: 'Equipment update!.'})
  
      },

      async load_Equipment (request, response) {
        const equipment = await Equipment.findAll();
        
        return response.json(equipment)
      
      },

      async load_EquipmentBuy (request, response) { 
        const equipment = await Equipment.findAll(
          { where:{ 
            quant_equipment:{ 
              [Op.lte]: 3 
            } 
          } 
          });

        return response.json(equipment) },

      async delete_Equipment (request, response) {
        
        const {id_equipment} = request.params;
      
        Equipment.destroy({where: {id_equipment}});
          
        return response.status(200).json({msg: 'Equipment deleted!.'})
           
        }
    
}