const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Nodemon api");
});

app.listen(port, () => {
  console.log(`working in ${port}`);
});
