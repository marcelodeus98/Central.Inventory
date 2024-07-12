const {object, string, number} = require ('yup');
const SpecifcEquipment = require ('../models/specfic_equipment');

module.exports = {
    async createEquipment(req, res){
        const schema = object().shape({
            nameEquipment: string().required(),
            model: string().required(),
            numberSerial: string().required(),
            state: string().required(),
            isUpdate: string().required(),
            note: string().required(),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Validation fails.'});
        }

        try{
            const existingEquipment = await SpecifcEquipment.findOne({
                where:{
                    numberSerial: req.body.numberSerial
                }
            });

            if(existingEquipment){
                return res.status(409).json({ error: 'Equipment already registered.'});
            };

            const{ nameEquipment, model, numberSerial, state, isUpdate,note } = await SpecifcEquipment.create(req.body);
            return res.json({
                nameEquipment, 
                model, 
                numberSerial, 
                state, 
                isUpdate,
                note
            });
        } catch(error){
            return res.status(500).json({ error: 'Internal server error.'});
        };
    },

    async loadEquipment (req, res){
        const equipment = await SpecifcEquipment.findAll();

        return res.json(equipment);
    },
    
    async updateEquipment (req, res){
        const schema = object().shape({
            idEquipment: number().required(),
            state: string().required(),
            isUpdate: string().required(),
            note: string().required(),
        });

        if(!(await schema.isValid(req.body))) {
            return res.status(400).json({error: 'Validation fails.'});
        }

        const {idEquipment, state, isUpdate, note } = req.body;

        const equipment = await SpecifcEquipment.findByPk(idEquipment);

        if(!equipment){
            return res.status(401).json({ error: 'Unable to update, equipment does not exist'});
        }

        equipment.state = state;
        equipment.isUpdate = isUpdate;
        equipment.note = note;
        
        const isSave = await equipment.save();

        return res.status(200).json({msg: 'Equipment update.'});
    },

    async deleteEquipment (req, res){
        try{
            const {idEquipment} = req.params;
    
            SpecifcEquipment.destroy({where: {idEquipment}});
    
            return res.status(200).json({msg: 'Equipment deleted.'});
        }
        catch(err){
            return res.status(500).json({ error: 'Internal server error.'});
        }
    }
}