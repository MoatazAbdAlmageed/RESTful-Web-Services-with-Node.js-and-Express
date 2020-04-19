/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const express = require("express");
const bookController = require("../controllers/bookController");

function routes(Book) {
  const bookRouter = express.Router();
  const ctrl = bookController(Book);
  //  Middleware
  bookRouter.use("/books/:bookId", (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      if (!book) {
        return res.sendStatus(404);
      }
      req.book = book;
      return next();
    });
  });

  bookRouter
    .route("/books")
    // add book
    .post(ctrl.addBook)
    // list books
    .get(ctrl.getBooks);

  bookRouter
    .route("/books/:bookId")
    // show single book
    .get(ctrl.getBook)
    // put single book (replace an existing resource)
    .put(ctrl.putBook)
    // patch single book ( apply partial modifications to a resource.)
    .patch(ctrl.patchBook)
    .delete(ctrl.deleteBook);
  return bookRouter;
}
module.exports = routes;
