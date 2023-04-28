const Customer = require("../model/customer");
const bcrypt = require("bcrypt");
const Utils = require("../utills/utills");
const JWT = require("jsonwebtoken");
const Nodemailer = require("../utills/nodemailer");
const emailTemplate = require("../templates/email");

class customerController {
  static async register(req, res, next) {
  
    const otp = Utils.generateVerificationToken();
    try {
      console.log(req.body);
      const newdata = {
        ...req.body,

        password: await Utils.encryptPassword(req.body.password),
        verification_token: otp,
        verification_token_time: Date.now() + 600000,
      };
      let register = await new Customer(newdata).save();
      emailTemplate({
        to: register.email,
        subject: "otp verification",
        email: "welcome to miniStore",
      });

      const token = JWT.sign( {email: register.email,customer_id: register._id,name: register.name, },"secret",{ expiresIn: "120d" } );
      console.log(register);
      const data = {
        _id: register._id,
        name: register.name,
        email: register.email,
        token: token,
      };
      res.send(data);
    } catch (err) {
      //   res.send(err);
      console.log(err);
    }
  }
  static async verification(req, res, next) {
    const verification_token = req.body.verification_token;
    const email = req.user.email;
    try {
      const user = await Customer.findOneAndUpdate(
        {
          email: email,
          verification_token: verification_token,
          verification_token_time: { $gt: Date.now() },
        },
        {
          verified: true,
        },
        { new: true }
      );
      if (user) {
        const token = JWT.sign(
          { email: user.email, customer_id: user._id, name: user.name },
          "secret",
          { expiresIn: "120d" }
        );
        console.log(user);
        const data = {
          _id: user._id,
          name: user.name,
          email: user.email,
          token: token,
        };
        res.send(data);
        // res.send(user);
      } else {
        throw new Error("verification Token is Expired");
      }
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    const { password, email } = req.body;
    const customer = req.customer;
    // console.log(customer);
    try {
      const token = JWT.sign(
        { name: customer.name, email, customer_id: customer._id },"secret",{ expiresIn: "120d" });
      await Utils.comparePassword(password, customer.password);
      const data = {
        _id: customer._id,
        name: customer.name,
        email: customer.email,
        token: token,
      };
      res.send(data);
    } catch (err) {
      next(err);
    }
  }

  static async getUserProfile(req, res, next) {
    console.log(req.user);
    try {
      let user = await Customer.findById(req.user.customer_id);
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        contact:user.contact
      });
    } catch (error) {
      next(error);
    }
  }

  static async googleRegister(req, res, next) {
    try {
      console.log(req.body.credential, "vvv");
      const verificationResponse = await Utils.verificationGoogleToken(
        req.body.credential
      );
      let user = verificationResponse.payload;
      // console.log(verificationResponse.payload,'verify')
      const newdata = {
        name: user.name,
        email: user.email,
      };
      let register = await new Customer(newdata).save();
      const token = JWT.sign(
        {
          email: register.email,
          customer_id: register._id,
          name: register.name,
        },
        "secret",
        { expiresIn: "120d" }
      );
      const data = {
        _id: register._id,
        name: register.name,
        email: register.email,
        token: token,
      };
      res.send(data);
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const verificationResponse = await Utils.verificationGoogleToken(
        req.body.credential
      );
      let user = verificationResponse.payload;

      const existUser = await Customer.findOne({ email: user.email });
      console.log(existUser, "exist user");

      const token = JWT.sign(
        {
          name: existUser.name,
          email: existUser.email,
          customer_id: existUser._id,
        },
        "secret",
        { expiresIn: "120d" }
      );

      const data = {
        _id: existUser._id,
        name: existUser.name,
        email: existUser.email,
        token: token,
      };
      res.send(data);
    } catch (error) {
      next(error);
    }
  }

  static async updateUserProfile(req,res,next){
    try {
      let user = await Customer.findById(req.user.customer_id);
      const token = JWT.sign(
        { name: user.name, email:user.email, customer_id:user._id },
        "secret",
        { expiresIn: "120d" }
      );
      if(user){
        user.name=req.body.name;
        user.contact=req.body.contact
      }
      const updatedUser=await user.save()
      
      const data = {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        contact:updatedUser.contact,
        token: token,
      };
      res.send(data)
      
    } catch (error) {
      next(error)
    }

  }
}

module.exports = customerController;
