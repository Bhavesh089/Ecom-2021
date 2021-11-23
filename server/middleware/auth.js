const admin = require("../firebase/index");
const User = require("../models/user");

//check user
exports.authCheck = async (req, res, next) => {
  try {
    //verify token with firebase admin library
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    console.log(firebaseUser, "firebase_verified");

    //put user in request
    req.user = firebaseUser;
    //next route
    next();
  } catch (error) {
    res.status(401).json({
      error: "Invalid or expired token",
    });
  }
};

//check admin
exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email }).exec();

  if (adminUser.role !== "admin") {
    res.status(403).json({
      err: "Admin resources. Access denied",
    });
  } else {
    next();
  }
};
