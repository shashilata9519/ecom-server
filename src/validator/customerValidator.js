const { body, query } = require("express-validator");

const Customer = require("../model/customer");

class customerValidator {
  static register() {
    return [
      body("email", "Email is required")
        .isEmail()
        .custom((email, { req }) => {
          return Customer.findOne({ email: email }).then((user) => {
            if (user) {
              throw new Error("user already exist");
            } else {
              return true;
            }
          });
        }),
      body("password", "Password is required").isAlphanumeric(),
      body("name", "name is required").isString(),
    ];
  }
  static login() {
    return [
      body("email", "email is required")
        .isEmail()
        .custom((email, { req }) => {
          return Customer.findOne({ email: email }).then((customer) => {
            if (customer) {
              req.customer = customer;
              return true;
            } else {
              throw new Error("User Does Not Exist");
            }
          });
        }),
      body("password", "password is required").isAlphanumeric(),
    ];
  }
}

module.exports = customerValidator;
