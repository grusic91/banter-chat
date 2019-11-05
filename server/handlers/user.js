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

/* Login User

*/

exports.loginUser = async function (req, res, next) {
  try {
    // finding a user from DB by email
    let user = await User.findOne({
      email: req.body.email
    });
    let { id, username, profileImageUrl } = user;
    let isMatch = await user.comparePassword(req.body.password); //in models/user.js
    if(isMatch) {
      /*If password is successfully matched with password in db make a token*/
      let token = jwt.sign(
        {
          id,
          username,
          profileImageUrl
        },
        config.SECRET_KEY//process.env.SECRET_KEY
      );
      return res.status(200).json({
        id, username, profileImageUrl, token
      });
    } else {
      return next({
        status: 400,
        message: "Invalid email/password"
      });
    }
  } catch (err) {
    return next({
      status: 400,
      message: err.message
    });
  }

  // checking if their password matches what was sent to the server
  //if it all matches
  // logged in (signing or creating jwt

}
