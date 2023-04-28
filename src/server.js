const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const productRouter = require("./router/productRouter");
const customerRouter = require("./router/customerRouter");

const cors = require("cors");
const Razorpay = require("razorpay");
const paymentRouter = require("./router/paymentRouter");
const orderRouter = require("./router/orderRouter ");
class Server {
  app = express(); //middleware 
  razorpay;

  constructor() {
    // this.config();

    this.setConfiguration();
    this.setRouter();
    this.handleErrors();
    this.setupPayment();
  }

  setupPayment() {
    this.razorpay = new Razorpay({
      key_id: "rzp_test_tcXcpbElDSiVDV",
      key_secret: "aRDdmeiw3Olp5N6H0WUmu7It",
    });
  }
        
  setConfiguration() {
   
    this.configureBodyParser();
    this.connectMongoDB();
  }
  configureBodyParser() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(express.json());
  }

  setRouter() {
    this.app.use("/api/product", productRouter);
    this.app.use("/api/customer", customerRouter);
    this.app.use("/src/uploads", express.static("src/uploads"));
    this.app.use("/api/payment", paymentRouter);
    this.app.use("/api/order",orderRouter)
  }

  async connectMongoDB() {
    try {
      const status = await mongoose.connect(
        "mongodb+srv://ecom:ecom@cluster.mddkxl9.mongodb.net/?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
      );
      if (status) {
        console.log("database is connected");
      }
    } catch (err) {
      console.log(err);
    }
  }

  //handling errors found in any function
  handleErrors() {
    this.app.use((error, req, res, next) => {
      let errorStatus = req.errorStatus || 500;
      res.status(errorStatus).json({
        message: error.message,
        status_code: errorStatus,
      });
    });
  }
}

module.exports = Server;
