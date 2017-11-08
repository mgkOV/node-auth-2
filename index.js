const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');

const app = express();

// DB setup
mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'dev') {
  mongoose.connect('mongodb://localhost/auth_2', {
    useMongoClient: true
  });
} else if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/auth_2_dev', {
    useMongoClient: true
  });
}

// App setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));

//routes
router(app);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 422).json({ error: err.message });
});

// Server setup
const port = process.env.PORT || 3090;
app.listen(port, () => {
  console.log(`Server run on port ${port}`);
});
