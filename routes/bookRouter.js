/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const express = require("express");

const bookRouter = express.Router();
const Book = require("../models/bookModel");

//  Middleware
bookRouter.use("/books/:bookId", (req, res, next) => {
  Book.findById(req.params.bookId, (err, book) => {
    if (err) {
      return res.send(err);
    }
    if (book) {
      req.book = book;
      return next();
    }
    return res.sendStatus(404);
  });
});

bookRouter
  .route("/books")
  // add book
  .post((req, res) => {
    const book = new Book(req.body);
    book.save((err, newBook) => {
      if (err) {
        return res.send(err);
      }
      return res.status(201).json(newBook);
    });
  })
  // list books
  .get((req, res) => {
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
        return res.send(err);
      }
      return res.json(books);
    });
  });

bookRouter
  .route("/books/:bookId")
  // show single book
  .get((req, res) => {
    return res.json(req.book);
  })
  // put single book (replace an existing resource)
  .put((req, res) => {
    const { book } = req;
    const { title, author, genre, read } = req.body;
    book.title = title;
    book.author = author;
    book.genre = genre;
    book.read = read;
    book.save((err) => {
      if (err) {
        return err;
      }
      return res.json(book);
    });
  })
  // patch single book ( apply partial modifications to a resource.)
  .patch((req, res) => {
    const { book } = req;
    if (req.body._id) {
      delete req.body._id;
    }
    Object.entries(req.body).forEach((item) => {
      book[item[0]] = item[1];
    });
    book.save((err) => {
      if (err) {
        return err;
      }
      return res.json(book);
    });
  })
  .delete((req, res) => {
    const { book } = req;
    book.remove((err) => {
      if (err) {
        return err;
      }
      return res.sendStatus(204);
    });
  });
module.exports = bookRouter;
