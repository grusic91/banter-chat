/*responsible to connecting with mongoose*/
const mongoose = require('mongoose');
const config = require('../config/dev');
mongoose.Promise = Promise; // for async functions thet returns promises

/* Connect to DB with mongoose */
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect(config.DB_URI,
  { keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

module.exports.User = require('./user');
