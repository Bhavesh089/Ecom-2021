var admin = require("firebase-admin");

var serviceAccount = require("../fbServiceKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
