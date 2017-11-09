const passport = require('passport');
require('./services/passport');

const { signup, signin } = require('./controllers/auth');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = app => {
  app.get('/', requireAuth, (req, res) => {
    res.json({ hi: 'react' });
  });

  app.post('/signin', requireSignin, signin);

  app.post('/signup', signup);
};
