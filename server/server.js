const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const { auth } = require("firebase-admin");
const { readdirSync } = require("fs");
require("dotenv").config();

//imports routes
const authRoutes = require("./routes/auth");

//app
const app = express();

//cors
app.use(cors());
//db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB CONNECTION ERR", err));

//middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use(express.json({ limit: "2mb" }));

//route
// app.use("/api", authRoutes);

// same as above one
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

//port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
