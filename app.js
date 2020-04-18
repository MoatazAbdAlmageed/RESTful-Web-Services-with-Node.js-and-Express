const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/bookModel");

const app = express();

const bookRouter = express.Router();
const db = mongoose.connect("mongodb://localhost/bookAPI");
const port = process.env.PORT || 3000;
bookRouter.route("/books").get((req, res) => {
  const { query } = req;
  const passedQuery = {};
  if (query.title) {
    passedQuery.title = query.title;
  }
  if (query.author) {
    passedQuery.author = query.author;
  }
  if (query.read) {
    passedQuery.read = query.read;
  }
  if (query.genre) {
    passedQuery.genre = query.genre;
  }
  Book.find(passedQuery, (err, books) => {
    if (err) {
      return res.json(err);
    }
    return res.json(books);
  });
});

bookRouter.route("/books/:bookId").get((req, res) => {
  Book.findById(req.params.bookId, (err, book) => {
    if (err) {
      return res.json(err);
    }
    return res.json(book);
  });
});

app.use("/api", bookRouter);
app.get("/", (req, res) => {
  res.send("Nodemon api");
});
app.listen(port, () => {
  console.log(`working in ${port}`);
});
