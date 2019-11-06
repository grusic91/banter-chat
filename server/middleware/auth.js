const config = require("../config/dev");
const jwt = require("jsonwebtoken");

/* AUTHENTICATION - user is logged */
exports.loginRequred = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // decode token
    jwt.verify(token, config.SECRET_KEY, function(err, decoded){
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
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, config.SECRET_KEY, function(err, decoded){
      if(decoded && decoded.id === req.params.id) {
        return next();
      } else {
        return next({
          status: 401,
          message: "Unauthorized"
        });
      }
    });
  } catch (e) {
    console.log(e);
    return next({
      status: 401,
      message: "Unauthorized"
    });
  }
}
