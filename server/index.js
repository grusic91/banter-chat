require('dotenv').config(); //load environment variables on process.env
const config = require('./config/dev');
const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error.js");
const authRoutes = require("./routes/auth.js")
const db = require("./models");

const PORT = process.env.PORT || 8002;

app.use(cors()); //Enable All CORS Requests
app.use(bodyParser.json()); // parse application/json

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
