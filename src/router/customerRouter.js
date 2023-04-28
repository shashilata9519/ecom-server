const { Router } = require("express");

const customerController = require("../controller/customerController");
const GlobalMiddleWare = require("../globalMiddleware/globalMiddleware");
const customerValidator = require("../validator/customerValidator");

class customerRouter {
  router;
  constructor() {
    this.router = Router();
    // this.getRouter()
    this.postRouter();
    this.getRouter();
    this.patchRouter();
    this.putRouter()
  }

  postRouter() {
    this.router.post(
      "/register",
      customerValidator.register(),
      GlobalMiddleWare.checkError,
      customerController.register
    );
    this.router.post(
      "/login",
      customerValidator.login(),
      GlobalMiddleWare.checkError,
      customerController.login
    );
    this.router.post("/googlelogin", customerController.googleLogin);
    this.router.post("/googleregister", customerController.googleRegister);
  }

  getRouter() {
    this.router.get(
      "/profile",
      GlobalMiddleWare.authenticate,
      GlobalMiddleWare.checkError,
      customerController.getUserProfile
    );
  }
  patchRouter() {
    this.router.patch(
      "/verify",
      GlobalMiddleWare.authenticate,
      customerController.verification
    );
  }
  putRouter(){
    this.router.put('/profile',GlobalMiddleWare.authenticate, GlobalMiddleWare.checkError,customerController.updateUserProfile)
  }
}

module.exports = new customerRouter().router;
