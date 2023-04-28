const Multer = require("multer");
const bcrypt = require("bcrypt");
const { OAuth2Client } = require("google-auth-library");
const storage = Multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

class Utils {
  static CLIENT_ID= "726011363239-7o93llcen2ebmvt542t3039v7b0va7tu.apps.googleusercontent.com"
  static multer = Multer({ storage: storage, fileFilter: fileFilter });
  static client = new OAuth2Client(Utils.CLIENT_ID);

  static encryptPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  }

  static comparePassword(plainPass, encryptPass) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plainPass, encryptPass, (err, isSame) => {
        if (err) {
          reject(err);
        } else if (!isSame) {
          reject(new Error("user and password does not match"));
        } else {
          resolve(true);
        }
      });
    });
  }

  static generateVerificationToken(size = 5) {
    let digits = "0123456789";
    let otp = "";
    for (let i = 0; i < size; i++) {
      otp = otp + digits[Math.floor(Math.random() * 10)];
    }
    return parseInt(otp);
  }

  static async verificationGoogleToken(token) {
    try {
      const ticket = await Utils.client.verifyIdToken({
        idToken: token,
        audience:Utils.CLIENT_ID
      });
      return {
        payload: ticket.getPayload(),
      };
    } catch (error) {
      console.log(error)
    }
  }
}

// console.log(new Utils().multer)
module.exports = Utils;
