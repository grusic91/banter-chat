require('dotenv').config(); //load all environment variables
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error.js");

const config = require("./config/dev.js");
const authRoutes = require("./routes/auth.js")
const User = require('./models/user');

const PORT = process.env.PORT || 8002;

/* Connect to DB with mongoose */
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect(config.DB_URI,
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });



//Enable All CORS Requests
app.use(cors());
// parse application/json
app.use(bodyParser.json());


/* all my routes will come here later, if they can not be reached, call 404 error handler */
app.use("/api/auth", authRoutes);

// handling 404 error, when route does not exist
app.use(function(req, res, next) {
  let err = new Error("Not Found!");
  err.status = 400;
  next(err); // run next with this specific error
});

/* take any incomming middelware from upper next()
whitin error and will print out nicer display of error */
app.use(errorHandler);


app.listen(PORT, () => console.log(`App is listening on prot ${PORT}!`))
