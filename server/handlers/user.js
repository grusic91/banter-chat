const User = require('../models/user');
const jwt = require("jsonwebtoken");
const config = require("../config/dev");

/* REGISTER USER - Sign Up
  function simply sign up new user
*/
exports.registerUser = async function (req, res, next) {
  try {
    let user = await User.create(req.body); // create user
    let {id, username, profileImageUrl } = user; // destruct some of properties from body

    let token = jwt.sign({
      id,
      username,
      profileImageUrl
    },
      config.SECRET_KEY//process.env.SECRET_KEY
    );
    return res.status(200).json({
      id, username, profileImageUrl, token
    });
  } catch (err) {
    // if a validation fails!
    if(err.code === 11000) {
      err.message="Sorry, the username and/or email is taken";
    }
    console.log(err);
    return next({
      status: 400,
      message: err.message
    });
  }
}
