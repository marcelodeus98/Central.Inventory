const User = require('../models/users');

module.exports = {
  async login(req, res) {
    try{
      const {user, password} = request.body;
    }
    catch(err){
      return res.status(400).json({error: err.message});
    }
  }
};