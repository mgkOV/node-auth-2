const Auth = require('./controllers/auth');

module.exports = app => {
  app.get('/', (req, res) => {
    res.json({ hi: 'react' });
  });

  app.post('/signup', Auth.signup);
};