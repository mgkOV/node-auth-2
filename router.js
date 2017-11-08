const passport = require('passport');
require('./services/passport');

const { signup } = require('./controllers/auth');

const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = app => {
  app.get('/', requireAuth, (req, res) => {
    res.json({ hi: 'react' });
  });

  app.post('/signup', signup);
};
