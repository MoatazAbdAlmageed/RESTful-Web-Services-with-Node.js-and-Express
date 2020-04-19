const should = require("should");
const sinon = require("sinon");
const bookController = require("../controllers/bookController");

describe("Book controller tests", () => {
  describe("Add book", () => {
    it("Should not allow an empty title", () => {
      const Book = function (book) {
        this.save = () => {};
      };
      const req = {
        body: {
          author: "moataz",
        },
      };
      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
      };

      const bookCTRL = bookController(Book);
      bookCTRL.addBook(req, res);
      res.status
        .calledWith(400)
        .should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith("Title is required").should.equal(true);
    });
  });
});
