var jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  isLoggedIn: async (req, res, next) => {
    console.log(req.headers);
    var token = req.headers.authorization;
    try {
      if (token) {
        var payload = await jwt.verify(token, process.env.SECRET);
        req.user = payload;
        next();
      } else {
        res.status(400).json({ error: 'Token Required' });
      }
    } catch (error) {
      next(error);
    }
  },
  authorizeOpt: async (req, res, next) => {
    let token = req.headers.authorization;
    try {
      if (token) {
        let payload = await jwt.verify(token, process.env.SECRET);
        req.user = payload;
        return next();
      } else {
        return next();
      }
    } catch (error) {
      next(error);
    }
  },
};