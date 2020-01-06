const config = require("../config");
const jwt = require("jsonwebtoken");

/* AUTHENTICATION - user is logged */
exports.loginRequred = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
    // decode token
    jwt.verify(token, config.SECRET_KEY, function(err, decoded){ // decoded is payload
      //if seccessfuly decoded this token we are done
      if(decoded) {
        return next();
      } else { // the token cannot be decoded
        return next({
          status: 401,
          message: "Please log in first!"
        });
      }
    });
  } catch (e) {
    return next({
      status: 401,
      message: "Please log in first"
    });
  }
}

/* AUTHORIZATION - correct user */
exports.ensureCorrectUser = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1]; // get token
    jwt.verify(token, config.SECRET_KEY, function(err, decoded){
      if(decoded && decoded.id === req.params.id) { // check if decoded.id from token payload is same ad in url
        // then allow user to move on
        return next();
      } else {
        return next({
          status: 401,
          message: "Unauthorized"
        });
      }
    });
  } catch (e) {
    return next({
      status: 401,
      message: "Unauthorized"
    });
  }
}
