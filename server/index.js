require('dotenv').config(); //load environment variables on process.env
const config = require('./config');
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const messagesRoutes = require('./routes/messages');
const { loginRequred, ensureCorrectUser } = require('./middleware/auth');
const db = require('./models');

const PORT = process.env.PORT || 8002;

app.use(cors()); //Enable All CORS Requests
app.use(bodyParser.json()); // parse application/json

/* all my routes will come here later, if they can not be reached, call 404 error handler */
app.use("/api/auth", authRoutes);
app.use("/api/users/:id/messages", loginRequred, ensureCorrectUser, messagesRoutes);

/*get all messages*/
app.get("/api/messages", loginRequred, async function(req, res, next) {
  try {
    //find and sort messages, and populate them with ownsers username, and profile img
    let messages = await db.Message.find()
      .sort({ createdAt: "desc" })
      .populate("user", {
        username: true,
        profileImageUrl: true
      });
    return res.status(200).json(messages);
  } catch (err) {
    return next(err);
  }
});

// for heroku
if (process.env.NODE_ENV === 'production') {
  const appPath = path.join(__dirname, '..', 'build')
  app.use(express.static(appPath));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(appPath, 'index.html'));
  });
}


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
