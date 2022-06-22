const User = require ('../models/users');

module.exports = {
    async login (request, response) {
        const {user , password} = request.body;
       /* const withEmailUsers = await User.findAll({
        where: {
          email
        }
      });
       if (withEmailUsers.length  === 0){
           return response.status(400).json({msg: 'User not found.'})
       } */

       const userValid = await User.findOne({ where: {user, password}});

       if (!userValid) {
         return response.status(401).json({ error: 'User does not exists' });
       }

       return response.status(200).json(user);

    }
}