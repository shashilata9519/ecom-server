const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: "Customer" ,required:true},
  orderItems: [
    { product_name: {type:String},
    qty:{type:Number},
    image: { type: String },
    price: { type: Number },
    product:{type: mongoose.Schema.ObjectId, ref: "Product" }
}

],
  shippingAddress: { address:{type:String},city:{type: String},pinCode:{type: Number},country:{type: String}},
  paymentMethod:{type: String},
  paymentResult:{
    id:{type: String},
    status:{type: String},
    update_time:{type: String},
    email_address:{type: String},
  },
  totalPrice:{type:Number,default:0.0},
  isPaid:{type:Boolean,default:false},
  paidAt:{type:Date},
  isDelivered:{type:Boolean,default:false},
  deliveredAt:{type: Date},
});

module.exports = mongoose.model("Order", orderSchema);
