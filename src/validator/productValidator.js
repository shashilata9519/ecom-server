const { body } = require("express-validator");
const Product = require("../model/product");

class productValidator {
  static addProduct() {
    return [
      body("product_name", "product is required").isString(),
      body("quantity", "quantity is required").isString(),
      body("price", "price is required").isString(),
      // body("image","image is required").isString()
    ];
  }
  static updateProduct() {
    return [
      body("_id", "id is required")
        .isAlphanumeric()
        .custom((_id, { req }) => {
          return Product.findOne({ _id: _id }).then((res) => {
            if (res) {
              req.product = res;
              return true;
            } else {
              throw new Error("product does not exist");
            }
          });
        }),
      body("product_name", "product is required").isString(),
      body("image", "image is required").isString(),
      body("quantity", "quantity is required").isString(),
      body("price", "price is required").isString(),
    ];
  }
}

module.exports = productValidator;
