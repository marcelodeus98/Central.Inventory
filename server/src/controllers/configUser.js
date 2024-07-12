const User = require('../models/users');
const {object, string, number} = require ('yup');
const bcrypt = require('bcryptjs');

module.exports = {
    async createUser(req, res){
        const schema = object().shape({
            name: string().required(),
            user: string().required(),
            password: string().required()
        });
        
        
        if(!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails.' })
        }
        
        const {name, user, password} = req.body;

        // Verificando se a senha está definida
        if (!password) {
            return res.status(400).json({ error: 'Password is required.' });
        }
        
        try{
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
        
            console.log(hash);
            
            const existingUser = await User.findOne({
                where:{
                    user: req.body.user
                }
            });

            if(existingUser){
                return res.status(409).json({ error: 'User already registered.'});
            };

            const newUser = await User.create({
                name,
                user,
                password: hash
            });

            return res.json({
                name, 
                user,
                hash
            });
        }
        catch(err){
            return res.status(500).json({ error: 'Internal server error.'});
        }
    },

    async loadUsers(req, res){
        try{
            const users = await User.findAll();
    
            res.status(200).json(users);
        }
        catch(err){
            return res.status(500).json({ error: 'Internal server error.'});
        }
    },

    async deleteUser (req, res){
        try{
            const {id} = req.params;
    
            User.destroy({where: {id}});
    
            return res.status(200).json({msg: 'Equipment deleted.'});
        }
        catch(err){
            return res.status(500).json({ error: 'Internal server error.'});
        }
    }

}