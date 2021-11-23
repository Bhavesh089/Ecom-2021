const User = require("../models/user");
const Cart = require("../models/cart");
const Order = require("../models/order");
const https = require("https");

const { v4: uuidv4 } = require("uuid");
var PaytmChecksum = require("../PaytmChecksum");

exports.createPayment = async (req, res) => {
  try {
    const { coupon } = req.body;
    console.log(coupon, "---->");

    const user = await User.findOne({ email: req.user.email }).exec();
    const cartItems = await Cart.findOne({ orderedBy: user._id }).exec();

    console.log(
      user._id.toString(),
      user.email,
      cartItems.toAddress.phoneNumber,
      cartItems.toAddress.phoneNumber,

      cartItems,
      "----------->"
    );
    var params = {};

    if (user && cartItems) {
      (params["MID"] = process.env.PAYTM_MID),
        (params["WEBSITE"] = process.env.PAYTM_WEBSITE),
        (params["CHANNEL_ID"] = process.env.PAYTM_CHANNEL_ID),
        (params["INDUSTRY_TYPE_ID"] = process.env.PAYTM_INDUSTRY_TYPE_ID),
        (params["ORDER_ID"] = uuidv4()),
        (params["CUST_ID"] = user._id.toString()),
        (params["CALLBACK_URL"] =
          "http://" + req.headers.host + "/api/user/payment/callback"),
        (params["EMAIL"] = user.email.toString());
      params["MOBILE_NO"] = cartItems.toAddress.phoneNumber.toString();

      //if coupon

      if (coupon) {
        /* initialize an array */

        params["TXN_AMOUNT"] = cartItems.totalAfterDiscount.toString();
      } else {
        params["TXN_AMOUNT"] = cartItems.cartTotal.toString();
      }

      /**
       * Generate checksum by parameters we have
       * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
       */
      console.log(params, "params ------->");
      var paytmChecksum = PaytmChecksum.generateSignature(
        params,
        process.env.PAYTM_MERCHANT_KEY
      );
      paytmChecksum
        .then(function (checksum) {
          console.log("generateSignature Returns: " + checksum);
          let paytmParams = {
            ...params,
            CHECKSUMHASH: checksum,
          };
          res.json(paytmParams);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  } catch (err) {
    console.log(err);
    console.log(req.body);
    res.status(400).send({
      err: err.message,
    });
  }
};

exports.verifyPayment = async (req, res) => {
  var paytmChecksum = "";
  var received_data = req.body;

  console.log(req.body, "params");

  var paytmParams = {};
  for (var key in received_data) {
    if (key == "CHECKSUMHASH") {
      paytmChecksum = received_data[key];
    } else {
      paytmParams[key] = received_data[key];
    }
  }

  var isValidChecksum = PaytmChecksum.verifySignature(
    paytmParams,
    process.env.PAYTM_MERCHANT_KEY,
    paytmChecksum
  );

  //MITM ATTACK HAS BEEN DONE OR NOT
  if (isValidChecksum) {
    console.log("Checksum Matched");
    /*
     * import checksum generation utility
     * You can get this utility from https://developer.paytm.com/docs/checksum/
     */

    var paytmParams = {};
    paytmParams["MID"] = received_data["MID"];
    paytmParams["ORDERID"] = received_data["ORDERID"];

    /*
     * Generate checksum by parameters we have
     * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
     */
    PaytmChecksum.generateSignature(
      paytmParams,
      process.env.PAYTM_MERCHANT_KEY
    ).then(function (checksum) {
      paytmParams["CHECKSUMHASH"] = checksum;

      var post_data = JSON.stringify(paytmParams);

      var options = {
        /* for Staging */
        hostname: "securegw-stage.paytm.in",

        /* for Production */
        // hostname: 'securegw.paytm.in',

        port: 443,
        path: "/order/status",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": post_data.length,
        },
      };

      var response = "";
      var post_req = https.request(options, function (post_res) {
        post_res.on("data", function (chunk) {
          response += chunk;
        });

        post_res.on("end", async function () {
          let response_data = JSON.parse(response);
          console.log("Response------>:", response_data);

          //   //create_order
          //   const user = await User.findById(response_data.CUST_ID).exec();

          //   console.log(user, "user-->");
          //   const { products } = await Cart.findOne({
          //     orderedBy: user._id,
          //   }).exec();

          console.log(req.user, "user is here--->");

          if (response_data.STATUS === "TXN_SUCCESS") {
            let newOrder = await new Order({
              PaymentDetails: response_data,
            }).save();

            let orderId = newOrder._id;
            console.log("New Order Saved", newOrder);

            res.redirect(`${process.env.FRONT_END}/status/${orderId}`);
          } else {
            let newOrder = await new Order({
              orderStatus: "Cancelled",
              PaymentDetails: response_data,
            }).save();

            let orderId = newOrder._id;
            console.log("New Order Saved", newOrder);

            res.redirect(`${process.env.FRONT_END}/status/${orderId}`);
          }
        });
      });

      post_req.write(post_data);
      post_req.end();
    });
  } else {
    // console.log('Checksum Mismatched');
    // console.log(req.body);

    res.json({
      MESSAGE: "STOP MESSING AROUND WITH GATEWAY",
    });
  }
};
