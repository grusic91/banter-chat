/*responsible to connecting with mongoose*/
const mongoose = require('mongoose');
const config = require('../config');
mongoose.Promise = Promise; // for async functions thet returns promises

/* Connect to DB with mongoose */
mongoose.Promise = Promise;
mongoose.connect(config.DB_URI,
  { keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

module.exports.User = require('./user');
module.exports.Message = require('./message');
