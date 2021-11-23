const User = require("../models/user");

exports.createUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;
  const user = await User.findOneAndUpdate(
    { email },
    { name, picture },
    { new: true }
  );

  //user exists then update
  if (user) {
    res.json(user);
    console.log("user updated", user);
    //create new user
  } else {
    const newUser = await new User({
      email,
      name: email.split("@")[0],
      picture,
    }).save();
    console.log("User Created", newUser);
    res.json(newUser);
  }
};

//current user
exports.currentUser = (req, res) => {
  //get user from req.user and find by email
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};
