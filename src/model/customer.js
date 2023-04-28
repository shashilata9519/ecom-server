const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  verified: { type: Boolean, required: false },
  verification_token: { type: Number, required: false },
  verification_token_time: { type: Date, required: false },
  reset_password_token: { type: Number, required: false },
  reset_password_token_time: { type: Date, required: false },
  contact:{type:Number}
});

module.exports = mongoose.model("Customer", customerSchema);
