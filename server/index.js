require('dotenv').config(); //load environment variables on process.env
const config = require('./config/dev.js');
const express = require('express');
const app = express();
<<<<<<< HEAD
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require("body-parser");

const { loginRequred, ensureCorrectUser } = require("./middleware/auth.js");

const errorHandler = require("./handlers/error.js");
const config = require("./config/dev.js");

const authRoutes = require("./routes/auth.js")
const messagesRoutes = require("./routes/messages.js")

const User = require('./models/user');
const Message = require('./models/message');
=======
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const db = require('./models')
>>>>>>> feature/login-backend

const PORT = process.env.PORT || 8002;

app.use(cors()); //Enable All CORS Requests
app.use(bodyParser.json()); // parse application/json

<<<<<<< HEAD
//Enable All CORS Requests
app.use(cors());
// parse application/json
app.use(bodyParser.json());


/* all my routes will come here later, if they can not be reached, call 404 error handler */
app.use("/api/auth", authRoutes);
app.use("/api/users/:id/messages",
  loginRequred,
  ensureCorrectUser,
  messagesRoutes
);

/* route for all messages*/
app.get("/api/messages", loginRequred, async function(req, res, next) {
  try {
    let messages = await Message.find()
      .sort({ createdAt: "desc" })
      .populate("user", {
        username: true,
        profileImageUrl: true
      }
    );
    return res.status(200).json(messages);
  } catch (err) {
    next(err);
  }
})
=======
/* all routes will come here, if they can not be reached, call 404 error handler */
app.use("/api/auth", authRoutes)
>>>>>>> feature/login-backend

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
