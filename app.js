const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bookModel = require("./models/bookModel");
const bookRouter = require("./routes/bookRouter")(bookModel);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.ENV === "Test") {
  console.log("TEST");
  const db = mongoose.connect("mongodb://localhost/bookAPI_Test");
} else {
  console.log("Production");
  const db = mongoose.connect("mongodb://localhost/bookAPI_Prod");
}

const port = process.env.PORT || 3000;
app.use("/api", bookRouter);
app.get("/", (req, res) => {
  res.send("Nodemon API");
});
app.server = app.listen(port, () => {
  console.log(`working in ${port}`);
});
module.exports = app;
