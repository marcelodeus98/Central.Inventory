const isAuthenticated = (req, res, next) => {
  console.log('Session Check:', req.session);
    if (!req.session.user) {
     return res.redirect('/');
    }
    console.log(req.session.user);
    return next();
  };
  
  module.exports = isAuthenticated;