const { Router } = require("express");
const productsController = require("../controller/productsController");
const GlobalMiddleWare = require("../globalMiddleware/globalMiddleware");
const Utils = require("../utills/utills");
const productValidator = require("../validator/productValidator");

class productRouter {
  router;
  constructor() {
    this.router = Router();
    this.getRouter();
    this.postRouter();
    this.deleteRouter();
    this.patchRouter();
  }
  getRouter() {
    this.router.get("/showproduct", productsController.showProduct);
    this.router.get("/:id", productsController.searchProduct);
  }
  postRouter() {
    this.router.post(
      "/addproduct",
      GlobalMiddleWare.authenticate,
      Utils.multer.single("image"),
      productValidator.addProduct(),
      GlobalMiddleWare.checkError,
      productsController.addProduct
    );
    this.router.post(
      "/review",
      GlobalMiddleWare.authenticate,
      GlobalMiddleWare.checkError,
      productsController.createProductReview
    );
  }
  deleteRouter() {
    this.router.delete("/deleteproduct/:id", productsController.deleteProduct);
  }
  patchRouter() {
    this.router.patch(
      "/updateproduct",
      productValidator.updateProduct(),
      GlobalMiddleWare.checkError,
      productsController.updateProduct
    );
  }
}
module.exports = new productRouter().router;
