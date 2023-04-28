const { validationResult } = require("express-validator");
const Jwt = require("jsonwebtoken");

class GlobalMiddleWare {
  static checkError(req, res, next) {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      // console.log(error.array(),'error')
      next(new Error(error.array()[0].msg));
    } else {
      next();
    }
  }
  static async authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader : null;
    // console.log(token)
    try {
      Jwt.verify(token, "secret", (err, decoded) => {
        // console.log(err,decoded)
        if (err) {
          next(err);
        } else if (!decoded) {
          req.errorStatus = 401;
          next(new Error("User Not Authorised"));
        } else {
          // console.log(decoded,'decoded')
          req.user = decoded;
          next();
        }
      });
    } catch (e) {
      req.errorStatus = 401;
      next(e);
    }
  }
}

module.exports = GlobalMiddleWare;
