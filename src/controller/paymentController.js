const crypto = require("crypto");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: "rzp_test_tcXcpbElDSiVDV",
  key_secret: "aRDdmeiw3Olp5N6H0WUmu7It",
});

class paymentController {
  static verification(req, res, next) {
    
    const secret = "razorpaysecret";

    console.log(req.body);

    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    console.log(digest, req.headers["x-razorpay-signature"]);

    if (digest === req.headers["x-razorpay-signature"]) {
      console.log("request is legit");
      res.status(200).json({
        message: "OK",
      });
    } else {
      res.status(403).json({ message: "Invalid" });
    }
  }
  static async razorpay(req, res, next) {
    const payment_capture = 1;
    const amount = 500;
    const currency = "INR";

    const options = {
      amount,
      currency,
      receipt: "10xcute",
      payment_capture,
    };

    try {
      const response = await razorpay.orders.create(options);
      console.log(response);
      res.status(200).json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = paymentController;
