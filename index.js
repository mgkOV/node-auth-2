const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// DB and CORS setup
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'dev') {
  mongoose.connect('mongodb://localhost/auth_2', {
    useMongoClient: true
  });
} else if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/auth_2_production', {
    useMongoClient: true
  });
  //CORS origin production setup
  corsOptions.origin = 'http://example.com';
}

// App setup
app.use(morgan('combined'));
app.use(cors(corsOptions));
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
