const User = require ('../models/users');

module.exports = {
    async login (request, response) {
        const {user } = request.body;
        const {password} = request.body;
       /* const withEmailUsers = await User.findAll({
        where: {
          email
        }
      });
       if (withEmailUsers.length  === 0){
           return response.status(400).json({msg: 'User not found.'})
       } */

       const userValid = await User.findOne({ where: { user } });
       const passwordValid = await User.findOne({ where: { password } });

       if (!userValid || !passwordValid) {
         return response.status(401).json({ error: 'User not found' });
       }

       return response.status(200).json({msg: 'User connected!.'})

    }
}