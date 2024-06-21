const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const db = require('../models/index');
const passport = require('passport');

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['access_token'];
  }
  return token;
};

const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET || 'Rijvan1116c'
};

passport.use(new JwtStrategy(opts, async (jwt_payload, next) => {
  try {
    const user = await db.User.findByPk(jwt_payload.id);
    if (user) {
      return next(null, user);
    } else {
      return next(null, null);
    }
  } catch (error) {
    return next(null, null);
  }
}));

module.exports = passport;
