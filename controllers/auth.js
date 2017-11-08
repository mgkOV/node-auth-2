const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { secretKey } = require('../config');

// Create JWT
const createJWT = id => jwt.sign({ sub: id }, secretKey, { expiresIn: '30d' });

module.exports = {
  signup(req, res, next) {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(422).json({ error: 'Username or password was not provided!' });
    }

    // check if user exists
    User.findOne({ username })
      .then(user => {
        if (user !== null) {
          return res.status(422).json({ error: 'Username is in use!' });
        }

        return User.create({ username, password }).then(user => {
          res.json({ jwt: createJWT(user.id) });
        });
      })
      .catch(err => {
        err.code !== 11000
          ? next(err)
          : res.json({ error: 'Username is in use!' });
      });
  }
};
