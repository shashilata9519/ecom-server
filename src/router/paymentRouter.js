const { Router } = require("express");
const paymentController = require("../controller/paymentController");

class paymentRouter {
  router;
  constructor() {
    this.router = Router();
    // this.getRouter()
    this.postRouter();
  }

  postRouter() {
    this.router.post("/verification", paymentController.verification);
    this.router.post("/razorpay", paymentController.razorpay);
  }
}

module.exports = new paymentRouter().router;
