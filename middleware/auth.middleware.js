const jwt = require('jsonwebtoken');
const db = require('../models/index');

const authMiddleware = async (req, res, next) => {

  // const token = req.cookies.access_token;
  // console.log(token,"auth");
  // if (!token) {
  //   return res.redirect('/login'); 
  // }

  // try {
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   const user = await db.User.findByPk(decoded.id);
  //   const session_token = await db.Session.findOne({ where: { session_token : decoded.session_token } });
  //   if (user && session_token) {
  //     req.user = { id: decoded.id, userName: user.dataValues.first_name + ' ' + user.dataValues.last_name, session_token : decoded.session_token };
  //     next(); 
  //   } else {
  //     res.clearCookie('access_token');
  //     return res.redirect('/login'); 
  //   }
  // } catch (error) {
  //   console.log(error);
  //   res.clearCookie('access_token');
  //   return res.redirect('/login');
  // }
  req.user = { id: 1, userName: "Rijvan Juneja", session_token: "token demo" };

  next();

};

module.exports = authMiddleware;
