/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
function bookController(Book) {
  function addBook(req, res) {
    const book = new Book(req.body);
    if (!req.body.title) {
      res.status(400);
      return res.send("Title is required");
    }
    book.save();
    res.status(201);
    return res.json(book);
  }
  function getBooks(req, res) {
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
      const returnBooks = books.map((book) => {
        const newBook = book.toJSON();
        newBook.links = {};
        newBook.links.self = `http://${req.headers.host}/api/books/${newBook._id}`;
        return newBook;
      });
      return res.json(returnBooks);
    });
  }
  function getBook(req, res) {
    const newBook = req.book.toJSON();
    newBook.links = {};
    const genre = req.book.genre.replace(/ /g, "%20");
    newBook.links.self = `http://${req.headers.host}/api/books/?genre=${genre}`;
    return res.json(newBook);
  }
  function putBook(req, res) {
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
  }
  function patchBook(req, res) {
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
  }
  function deleteBook(req, res) {
    const { book } = req;
    book.remove((err) => {
      if (err) {
        return err;
      }
      return res.sendStatus(204);
    });
  }
  return { addBook, getBooks, getBook, putBook, patchBook, deleteBook };
}
module.exports = bookController;
