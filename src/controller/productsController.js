const Product = require("../model/product");
const SearchFeatures = require("../utills/searchFeature");

class productsController {
  static async showProduct(req, res, next) {
    try {


      console.log(req.query, "query");   
      const resultPerPage=10//only 10 products we are showing in per page
      const productCount= await Product.countDocuments()
      // console.log(productCount,'nofproducts')

      const searchFeature= new SearchFeatures(Product.find(),req.query).search().filter()

      let products=await searchFeature.query 
       searchFeature.pagination(resultPerPage)
       let filteredProductCount= products.length
      //  console.log(filteredProductCount,'filteredProductCount')
      products=await searchFeature.query.clone()
      res.send({products,resultPerPage,productCount,filteredProductCount});
    } catch (err) {
      res.send(res);
    }
  }

  
  static async addProduct(req, res, next) {
    try {
      const data = {
        image: req.file.path,
      };

      // console.log(data)

      let product = await new Product({
        ...req.body,
        image: req.file.path,
      }).save();
      res.send(product);
    } catch (err) {
      res.send(err);
    }
  }
  static async deleteProduct(req, res, next) {
    try {
      let del_product = await Product.deleteOne({ _id: req.params.id });
      res.send(del_product);
    } catch (err) {
      res.send(err);
    }
  }
  static async updateProduct(req, res, next) {
    try {
      let update_product = await Product.findByIdAndUpdate(
        req.body._id,
        req.body
      );
      res.send("updated successfully");
    } catch (err) {
      res.send(err);
    }
  }
  static async searchProduct(req, res, next) {
    try {
      let search_product = await Product.findById({ _id: req.params.id });
      res.send(search_product);
    } catch (error) {
      res.send(error);
    }
  }
  static async createProductReview(req, res, next) {
    try {
      let review_product = await Product.findById({ _id: req.body.productId });

      if (review_product) {
        const alreadyReview = review_product.reviews.find(
          (x) => x.user.toString() === req.user.customer_id.toString()
        ); //check
        // console.log(alreadyReview);
        if (alreadyReview) {
          // console.log('product already reviewed')
          next(new Error("product already reviewed"));
        }

        const review = {
          name: req.user.name,
          rating: req.body.rating,
          comment: req.body.comment,
          user: req.user.customer_id,
        };
        // console.log(review, "review");
        review_product.reviews.push(review);
        review_product.numReviews = review_product.reviews.length;
        review_product.rating =
          review_product.reviews.reduce((sum, item) => item.rating + sum, 0) /
          review_product.reviews.length;
        await review_product.save();

        res.send({ msg: "Review Added" });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = productsController;
