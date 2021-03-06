const passport = require('passport');
const User = require('../models/user');
const { secretKey } = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

// LocalStrategy
// create LocalStrategy

const localOpt = {
  usernameField: 'username'
};

const localLogin = new LocalStrategy(localOpt, (username, password, done) => {
  username = username.toLowerCase();
  User.findOne({ username })
    .then(user => {
      if (!user) return done(null, false);

      return user.comparePassword(password).then(isMatch => {
        if (!isMatch) return done(null, false);

        return done(null, user);
      });
    })
    .catch(done);
});

// Setup option fore jwt strategy
const jwtOpt = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: secretKey
};

// Create jwt strategy
const jwtLogin = new JwtStrategy(jwtOpt, (jwt_payload, done) => {
  User.findById(jwt_payload.sub)
    .then(user => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch(err => done(err, false));
});

// Register jwt strategy
passport.use(jwtLogin);
passport.use(localLogin);
