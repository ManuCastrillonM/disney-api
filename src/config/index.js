const { json } = require('express');

const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

const config = require('./config');
const graphqlServer = require('../graphql');
const router = require('../routes');

module.exports = (app) => {
  mongoose.connect(config.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

  mongoose.Promise = global.Promise;

  mongoose.connection.on('error', (err) => {
    console.error(`${err.message}`);
  });

  mongoose.connection.once('open', function () {
    console.log('DB connection Successful!');
  });

  app.use(morgan('dev'));
  app.use(cors());
  app.use(json());
  app.use('/', router);
  app.use('/graphql', graphqlServer);
};
