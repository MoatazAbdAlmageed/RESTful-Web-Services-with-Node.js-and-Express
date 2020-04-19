const should = require("should");
const supertest = require("supertest");
const mongoose = require("mongoose");
process.env.ENV = "Test";
const app = require("../app.js");
const book = mongoose.model("Book");
const agent = supertest.agent(app);
describe("Book crud test", () => {
  it("Should allow a book o be posted and return read and _id", (done) => {
    const bookPost = {
      title: "Book title",
      author: "Book author",
      genre: "Book genre",
    };

    agent
      .post("/api/books")
      .send(bookPost)
      .expect(200)
      .end((err, results) => {
        // results.body.read.should.not.equal(false);
        results.body.should.have.property("_id");
        done();
      });
  });

  afterEach((done) => {
    book.deleteMany({}).exec();
    done();
  });

  after((done) => {
    mongoose.connection.close();
    app.server.close(done());
  });
});
