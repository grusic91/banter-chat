const db = require('../models');
const config = require('../config');
const jwt = require('jsonwebtoken');

/*LOGIN USER*/

exports.login = async function (req, res, next) {
  try {
    // finding a user from DB by email
    let user = await db.User.findOne({
      email: req.body.email
    });
    let { id, username, profileImageUrl } = user;

    // create new password's hash from typed one and compare it with the hash in db
    let isMatch = await user.comparePassword(req.body.password); //in models/user.js
    if(isMatch) {
      /*If password is successfully matched with password in db sign a token*/
      let token = jwt.sign(
        {
          id,
          username,
          profileImageUrl
        }, config.SECRET_KEY); // process.env.SECRET_KEY

      // return data from DB
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
}

/* REGISTER USER - Sign Up
  function simply sign up new user
*/
exports.register = async function (req, res, next) {
  try {
    let user = await db.User.create(req.body); // create user
    let {id, username, profileImageUrl } = user; // destruct some of properties from body

    // signing a token with payload and secret key
    let token = jwt.sign({
      /*pyload, we can decript it*/
      id,
      username,
      profileImageUrl
    }, config.SECRET_KEY); //process.env.SECRET_KEY

    return res.status(200).json({
      //send this information back
      id, username, profileImageUrl, token
    });
  } catch (err) {
    // if validation fails
    if(err.code === 11000) {
      err.message="Sorry, the username and/or email is taken";
    }
    // otherwise return generic error
    return next({
      status: 400,
      message: err.message
    });
  }
}
