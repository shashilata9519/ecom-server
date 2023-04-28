const { Router } = require("express");
const orderController = require("../controller/orderController");
const GlobalMiddleWare = require("../globalMiddleware/globalMiddleware");


class orderRouter {
  router;
  constructor() {
    this.router = Router();
    this.getRouter()
    this.postRouter();
  }

  postRouter() {
    this.router.post("/addorder", GlobalMiddleWare.authenticate,GlobalMiddleWare.checkError, orderController.addOrder);
    // this.router.post("/razorpay", orderController.razorpay);
  }
  getRouter(){
    this.router.get("/getmyorder", GlobalMiddleWare.authenticate,GlobalMiddleWare.checkError, orderController.getMyOrder);
  }
}

module.exports = new orderRouter().router;
