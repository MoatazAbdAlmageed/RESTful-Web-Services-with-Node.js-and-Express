const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bookRouter = require("./routes/bookRouter");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const db = mongoose.connect("mongodb://localhost/bookAPI");
const port = process.env.PORT || 3000;
app.use("/api", bookRouter);
app.get("/", (req, res) => {
  res.send("Nodemon API");
});
app.listen(port, () => {
  console.log(`working in ${port}`);
});
